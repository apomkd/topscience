#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="/opt/topscience/.env.ai-draft"
BFL_SCRIPT="/opt/topscience/ops/scripts/bfl_generate_image.py"
CMS_SCRIPT="/opt/topscience/ops/scripts/cms-create-draft.sh"
TMP_DIR="/opt/topscience/backups/tmp"
OUT_JSON="$TMP_DIR/ai-draft.json"

mkdir -p "$TMP_DIR"
set -a; source "$ENV_FILE"; set +a

read -r -p "source_url: " SOURCE_URL
read -r -p "title: " TITLE
read -r -p "excerpt: " EXCERPT
read -r -p "category: " CATEGORY
read -r -p "content_type: " CONTENT_TYPE
read -r -p "tags (comma separated): " TAGS_RAW

echo "Paste body, then Ctrl+D:"
BODY_FILE="$TMP_DIR/body.txt"
cat > "$BODY_FILE"

BASE_SLUG="$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g' | cut -c1-110)"
SLUG="${BASE_SLUG}-$(date +%s)"

IMG_JSON="$($BFL_SCRIPT "Editorial science cover image: $TITLE. Realistic, no text." || true)"
IMG_URL="$(echo "$IMG_JSON" | sed -n 's/.*"image_url":[[:space:]]*"\([^"]*\)".*/\1/p')"

TAGS_JSON="$(echo "$TAGS_RAW" | awk -F',' '{printf "["; c=0; for(i=1;i<=NF;i++){gsub(/^[ \t]+|[ \t]+$/, "", $i); if(length($i)){if(c++) printf ","; gsub(/"/,"\\\"", $i); printf "\"%s\"", $i}} printf "]"}')"

BODY_ESCAPED="$(sed ':a;N;$!ba;s/\n/\\n/g' "$BODY_FILE" | sed 's/"/\\"/g')"

cat > "$OUT_JSON" <<PAYLOAD
{
"title": "$TITLE",
"slug": "$SLUG",
"excerpt": "$EXCERPT",
"body": "$BODY_ESCAPED",
"category": "$CATEGORY",
"content_type": "$CONTENT_TYPE",
"tags": $TAGS_JSON,
"author_name": "TopScience Editorial",
"cover_image_url": "${IMG_URL:-}",
"status": "draft",
"source_url": "$SOURCE_URL"
}
PAYLOAD

$CMS_SCRIPT "$OUT_JSON"

ID="$(grep -o '"id":[0-9]*' /tmp/cms_create_resp.json | head -n1 | cut -d: -f2 || true)"
echo "DRAFT_CREATED id=${ID:-unknown} slug=$SLUG"
echo "admin: http://31.187.76.46:8055/admin/content/articles/${ID:-}"
echo "preview: ${PREVIEW_BASE_URL:-http://31.187.76.46:3000}/preview/$SLUG?token=${PREVIEW_TOKEN:-}"
