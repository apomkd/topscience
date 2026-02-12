#!/usr/bin/env bash
set -euo pipefail
COMPOSE_FILE="/opt/topscience/infra/docker/docker-compose.staging.yml"
ENV_FILE="/opt/topscience/infra/docker/.env.staging"
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" down
