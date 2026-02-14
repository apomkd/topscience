#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
echo "Usage: $0 <slug>"
exit 1
fi

SLUG="$1"
PGC="$(docker ps --format '{{.Names}}' | grep -E 'docker-postgres-1|topscience-postgres|postgres' | head -n1)"

if [[ -z "${PGC:-}" ]]; then
echo "[demote][ERROR] postgres container not found"
exit 1
fi

echo "[demote] target slug=$SLUG"

docker exec -i "$PGC" psql -U topscience -d topscience <<SQL
UPDATE articles
SET
status = 'draft'
WHERE slug = '${SLUG}'
AND status = 'published';
SQL

echo "[demote] verify:"
docker exec -i "$PGC" psql -U topscience -d topscience -c "
select id,slug,status,content_type,author_name,published_at
from articles
where slug='${SLUG}';
"
