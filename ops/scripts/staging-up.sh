#!/usr/bin/env bash
set -euo pipefail
cd /opt/topscience
[ -f infra/docker/.env.staging ] || { echo "Missing infra/docker/.env.staging"; exit 1; }
docker compose --env-file infra/docker/.env.staging -f infra/docker/docker-compose.staging.yml config >/dev/null
docker compose --env-file infra/docker/.env.staging -f infra/docker/docker-compose.staging.yml pull
docker compose --env-file infra/docker/.env.staging -f infra/docker/docker-compose.staging.yml up -d
docker compose --env-file infra/docker/.env.staging -f infra/docker/docker-compose.staging.yml ps
