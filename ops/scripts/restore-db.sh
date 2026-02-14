#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
echo "Usage: $0 <backup-file.sql>"
echo "Example: $0 /opt/topscience/backups/topscience-2026-02-14-1413.sql"
exit 1
fi

BACKUP_FILE="$1"

if [[ ! -f "$BACKUP_FILE" ]]; then
echo "[restore][ERROR] backup file not found: $BACKUP_FILE"
exit 1
fi

PGC="$(docker ps --format '{{.Names}}' | grep -E 'docker-postgres-1|topscience-postgres|postgres' | head -n1)"
if [[ -z "${PGC:-}" ]]; then
echo "[restore][ERROR] postgres container not found"
exit 1
fi

echo "[restore] Using postgres container: $PGC"
echo "[restore] File: $BACKUP_FILE"
echo "[restore][WARN] This will overwrite current DB state."
read -r -p "Type YES to continue: " CONFIRM
if [[ "$CONFIRM" != "YES" ]]; then
echo "[restore] Aborted."
exit 1
fi

# Optional safety snapshot before restore
TS="$(date +%F-%H%M)"
docker exec -i "$PGC" pg_dump -U topscience -d topscience > "/opt/topscience/backups/pre-restore-${TS}.sql"
echo "[restore] Pre-restore snapshot saved: /opt/topscience/backups/pre-restore-${TS}.sql"

# Recreate public schema cleanly and restore
docker exec -i "$PGC" psql -U topscience -d topscience <<'SQL'
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO topscience;
GRANT ALL ON SCHEMA public TO public;
SQL

docker exec -i "$PGC" psql -U topscience -d topscience < "$BACKUP_FILE"

echo "[restore][OK] Restore completed."
