#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="/opt/topscience/backups"
RESTORE_SAFE="/opt/topscience/ops/scripts/restore-db-safe.sh"

if [[ ! -x "$RESTORE_SAFE" ]]; then
echo "[restore-latest][ERROR] missing executable: $RESTORE_SAFE"
exit 1
fi

LATEST="$(ls -1t "${BACKUP_DIR}"/topscience-*.sql 2>/dev/null | head -n1 || true)"
if [[ -z "${LATEST:-}" ]]; then
echo "[restore-latest][ERROR] no backup files found in ${BACKUP_DIR}"
exit 1
fi

echo "[restore-latest] latest backup: $LATEST"

MODE="${1:-}"
case "$MODE" in
--check-only)
exec "$RESTORE_SAFE" "$LATEST" --check-only
;;
--yes)
exec "$RESTORE_SAFE" "$LATEST" --yes
;;
"" )
exec "$RESTORE_SAFE" "$LATEST"
;;
*)
echo "Usage: $0 [--check-only|--yes]"
exit 1
;;
esac
