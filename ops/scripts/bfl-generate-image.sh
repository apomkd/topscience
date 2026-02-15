#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="/opt/topscience/.env.ai-draft"
PROMPT="${1:-Futuristic scientific illustration of astronauts in microgravity, realistic, editorial style, no text}"

set -a
source "$ENV_FILE"
set +a

if [[ "${BFL_ENABLED:-0}" != "1" ]]; then
echo "BFL disabled"; exit 1
fi
if [[ -z "${BFL_API_KEY:-}" ]]; then
echo "Missing BFL_API_KEY"; exit 1
fi

OUT_JSON="/tmp/bfl_image_resp.json"

# Attempt 1: aspect-ratio style payload
HTTP_CODE=$(curl -s -o "$OUT_JSON" -w "%{http_code}" \
-X POST "https://api.bfl.ai/v1/images/generations" \
-H "Authorization: Bearer $BFL_API_KEY" \
-H "Content-Type: application/json" \
-d "{
\"prompt\": $(printf '%s' "$PROMPT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'),
\"aspect_ratio\": \"${BFL_ASPECT_RATIO:-16:9}\",
\"width\": ${BFL_WIDTH:-1536},
\"height\": ${BFL_HEIGHT:-864}
}")

if [[ "$HTTP_CODE" -lt 200 || "$HTTP_CODE" -gt 299 ]]; then
echo "bfl_http_code=$HTTP_CODE"
cat "$OUT_JSON"
exit 1
fi

IMAGE_URL=$(python3 - <<'PY'
import json
p="/tmp/bfl_image_resp.json"
d=json.load(open(p))
# common response patterns
candidates=[
d.get("data",[{}])[0].get("url"),
d.get("url"),
d.get("output",[{}])[0].get("url"),
d.get("images",[{}])[0].get("url"),
]
print(next((x for x in candidates if x), ""))
PY
)

if [[ -z "$IMAGE_URL" ]]; then
echo "No image URL found in response:"
cat "$OUT_JSON"
exit 1
fi

echo "$IMAGE_URL"
