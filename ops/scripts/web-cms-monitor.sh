#!/usr/bin/env bash
set -euo pipefail

OUT="$(/opt/topscience/ops/scripts/web-cms-smoke.sh 2>&1 || true)"
echo "$OUT" > /tmp/web-cms-smoke.last.log

fallback="$(echo "$OUT" | awk -F= '/fallback_count=/{print $2}' | tail -n1 | tr -d '[:space:]')"
cms_title="$(echo "$OUT" | awk -F= '/cms_title_count=/{print $2}' | tail -n1 | tr -d '[:space:]')"
slug_hits="$(echo "$OUT" | awk -F= '/article_slug_hits=/{print $2}' | tail -n1 | tr -d '[:space:]')"
directus_slugs="$(echo "$OUT" | awk -F= '/directus_slugs=/{print $2}' | tail -n1 | tr -d '[:space:]')"
health_ok="$(echo "$OUT" | grep -c '{"status":"ok"}' || true)"

fail=0
[[ "${fallback:-}" == "0" ]] || fail=1
[[ "${cms_title:-0}" -ge 1 ]] || fail=1
[[ "${slug_hits:-0}" -ge 1 ]] || fail=1
[[ "${directus_slugs:-0}" -ge 1 ]] || fail=1
[[ "${health_ok:-0}" -ge 1 ]] || fail=1

if [[ "$fail" -eq 1 ]]; then
echo "[monitor][FAIL] web-cms smoke failed at $(date -Iseconds)"
cat /tmp/web-cms-smoke.last.log
exit 1
fi

echo "[monitor][OK] $(date -Iseconds)"
