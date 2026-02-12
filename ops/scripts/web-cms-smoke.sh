#!/usr/bin/env bash
set -euo pipefail

echo "[smoke] checking web on :3000"
WEB_HTML="$(curl -s http://127.0.0.1:3000)"

echo -n "[smoke] fallback_count="; echo "$WEB_HTML" | grep -o "No CMS articles yet" | wc -l
echo -n "[smoke] cms_title_count="; echo "$WEB_HTML" | grep -o "Latest from CMS" | wc -l
echo -n "[smoke] article_slug_hits="; echo "$WEB_HTML" | grep -o "ai-assisted-drug-discovery" | wc -l

echo "[smoke] checking directus health"
curl -s http://127.0.0.1:8055/server/health
echo

echo "[smoke] checking published articles API"
echo -n "[smoke] directus_slugs="
curl -s "http://127.0.0.1:8055/items/articles?limit=3&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published" | grep -o '"slug"' | wc -l

echo "[smoke] done"
