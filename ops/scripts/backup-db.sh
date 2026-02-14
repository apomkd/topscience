#!/usr/bin/env bash
set -euo pipefail

TS="$(date +%F-%H%M)"
OUT_DIR="/opt/topscience/backups"
PGC="$(docker ps --format '{{.Names}}' | grep -E 'docker-postgres-1|topscience-postgres|postgres' | head -n1)"

if [[ -z "${PGC:-}" ]]; then
echo "[backup][ERROR] postgres container not found"
exit 1
fi

# DB dump
docker exec -i "$PGC" pg_dump -U topscience -d topscience > "${OUT_DIR}/topscience-${TS}.sql"

# env snapshot
cp /opt/topscience/infra/docker/.env.staging "${OUT_DIR}/env-staging-${TS}.bak"

# retention: keep last 14 days
find "${OUT_DIR}" -type f -name 'topscience-*.sql' -mtime +14 -delete
find "${OUT_DIR}" -type f -name 'env-staging-*.bak' -mtime +14 -delete

echo "[backup][OK] ${TS}"
