#!/usr/bin/env bash
set -euo pipefail

usage() {
cat <<USAGE
Usage:
$0 <backup-file.sql> [--yes]
$0 <backup-file.sql> --check-only

Examples:
$0 /opt/topscience/backups/topscience-2026-02-14-1413.sql --check-only
$0 /opt/topscience/backups/topscience-2026-02-14-1413.sql
USAGE
}

if [[ $# -lt 1 ]]; then
usage
exit 1
fi

BACKUP_FILE="$1"
MODE="${2:-}"
AUTO_YES="${3:-}"

if [[ ! -f "$BACKUP_FILE" ]]; then
echo "[safe-restore][ERROR] backup file not found: $BACKUP_FILE"
exit 1
fi

if [[ ! -s "$BACKUP_FILE" ]]; then
echo "[safe-restore][ERROR] backup file is empty: $BACKUP_FILE"
exit 1
fi

# Basic signature checks
HEAD_SNIP="$(head -n 40 "$BACKUP_FILE" || true)"
if ! echo "$HEAD_SNIP" | grep -Eq "PostgreSQL database dump|CREATE TABLE|COPY .* FROM stdin"; then
echo "[safe-restore][ERROR] file does not look like a valid PostgreSQL plain SQL dump"
exit 1
fi

PGC="$(docker ps --format '{{.Names}}' | grep -E 'docker-postgres-1|topscience-postgres|postgres' | head -n1)"
if [[ -z "${PGC:-}" ]]; then
echo "[safe-restore][ERROR] postgres container not found"
exit 1
fi

echo "[safe-restore] postgres container: $PGC"
echo "[safe-restore] backup file: $BACKUP_FILE"
echo "[safe-restore] file size: $(du -h "$BACKUP_FILE" | awk '{print $1}')"

# DB connectivity check
if ! docker exec -i "$PGC" psql -U topscience -d topscience -c "select 1;" >/dev/null 2>&1; then
echo "[safe-restore][ERROR] cannot connect to database topscience as user topscience"
exit 1
fi

echo "[safe-restore][OK] pre-check passed"

if [[ "$MODE" == "--check-only" ]]; then
echo "[safe-restore] check-only mode completed"
exit 0
fi

echo "[safe-restore][WARN] This will replace the current public schema."
echo "[safe-restore][WARN] A pre-restore snapshot will be created."

if [[ "$MODE" != "--yes" && "$AUTO_YES" != "--yes" ]]; then
read -r -p "Type YES to continue: " CONFIRM
[[ "$CONFIRM" == "YES" ]] || { echo "[safe-restore] aborted"; exit 1; }

read -r -p "Type RESTORE to confirm final action: " CONFIRM2
[[ "$CONFIRM2" == "RESTORE" ]] || { echo "[safe-restore] aborted"; exit 1; }
fi

TS="$(date +%F-%H%M)"
PRE="/opt/topscience/backups/pre-restore-${TS}.sql"

docker exec -i "$PGC" pg_dump -U topscience -d topscience > "$PRE"
echo "[safe-restore] pre-restore snapshot: $PRE"

docker exec -i "$PGC" psql -U topscience -d topscience <<'SQL'
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO topscience;
GRANT ALL ON SCHEMA public TO public;
SQL

docker exec -i "$PGC" psql -U topscience -d topscience < "$BACKUP_FILE"

# Post-restore sanity checks
docker exec -i "$PGC" psql -U topscience -d topscience -c "select count(*) as articles_count from articles;" || true
docker exec -i "$PGC" psql -U topscience -d topscience -c "select count(*) as categories_count from categories;" || true

echo "[safe-restore][OK] restore completed"
echo "[safe-restore] run smoke check: /opt/topscience/ops/scripts/web-cms-smoke.sh"
