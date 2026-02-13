#!/usr/bin/env bash
set -euo pipefail

count_matches() {
  local pattern="$1"
  local text="$2"
  printf "%s" "$text" | grep -o "$pattern" 2>/dev/null | wc -l || true
}

echo "[smoke] checking web on :3000"
WEB_HTML="$(curl -s http://127.0.0.1:3000)"

echo -n "[smoke] fallback_count="; count_matches "No CMS articles yet" "$WEB_HTML"
echo -n "[smoke] cms_title_count="; count_matches "Latest from CMS" "$WEB_HTML"
echo -n "[smoke] article_slug_hits="; count_matches "ai-assisted-drug-discovery" "$WEB_HTML"

echo "[smoke] checking directus health"
curl -s http://127.0.0.1:8055/server/health
echo

echo "[smoke] checking published articles API"
echo -n "[smoke] directus_slugs="
curl -s "http://127.0.0.1:8055/items/articles?limit=3&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published" \
  | grep -o '"slug"' | wc -l || true

echo "[smoke] done"
