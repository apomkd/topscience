#!/usr/bin/env bash
set -euo pipefail

API="http://127.0.0.1:8055/items/articles?limit=50&sort=-id"

RAW="$(curl -s "$API")"

count_total="$(echo "$RAW" | grep -o '"id"' | wc -l || true)"
count_published="$(echo "$RAW" | grep -o '"status":"published"' | wc -l || true)"
count_missing_title="$(echo "$RAW" | grep -o '"title":""' | wc -l || true)"
count_missing_slug="$(echo "$RAW" | grep -o '"slug":""' | wc -l || true)"
count_missing_body="$(echo "$RAW" | grep -o '"body":""' | wc -l || true)"
count_missing_category="$(echo "$RAW" | grep -o '"category":""' | wc -l || true)"

echo "[readiness] total=$count_total"
echo "[readiness] published=$count_published"
echo "[readiness] missing_title=$count_missing_title"
echo "[readiness] missing_slug=$count_missing_slug"
echo "[readiness] missing_body=$count_missing_body"
echo "[readiness] missing_category=$count_missing_category"

if [[ "$count_published" -lt 1 ]]; then
echo "[readiness][WARN] no published articles"
fi

if [[ "$count_missing_title" -gt 0 || "$count_missing_slug" -gt 0 || "$count_missing_body" -gt 0 || "$count_missing_category" -gt 0 ]]; then
echo "[readiness][WARN] incomplete content found"
exit 1
fi

echo "[readiness][OK] content looks ready"
