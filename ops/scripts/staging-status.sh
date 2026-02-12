#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="/opt/topscience/infra/docker/docker-compose.staging.yml"
ENV_FILE="/opt/topscience/infra/docker/.env.staging"

echo "== compose ps =="
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps

echo
echo "== web 3000 =="
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000 || true

echo "== cms 8055 =="
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8055 || true
