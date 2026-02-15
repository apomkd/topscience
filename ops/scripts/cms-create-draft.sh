#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
echo "Usage: cms-create-draft.sh /path/to/draft.json"
exit 1
fi

DRAFT_JSON="$1"
ENV_FILE="/opt/topscience/.env.ai-draft"

if [[ ! -f "$ENV_FILE" ]]; then
echo "Missing $ENV_FILE"
exit 1
fi

set -a
source "$ENV_FILE"
set +a

if [[ -z "${CMS_URL:-}" || -z "${CMS_TOKEN:-}" ]]; then
echo "CMS_URL/CMS_TOKEN missing in $ENV_FILE"
exit 1
fi

HTTP_CODE=$(curl -s -o /tmp/cms_create_resp.json -w "%{http_code}" \
-X POST "$CMS_URL/items/articles" \
-H "Authorization: Bearer $CMS_TOKEN" \
-H "Content-Type: application/json" \
--data @"$DRAFT_JSON")

echo "http_code=$HTTP_CODE"
cat /tmp/cms_create_resp.json
