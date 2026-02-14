#!/usr/bin/env bash
set -euo pipefail

HTML="$(curl -s http://127.0.0.1:3000)"

# current stable minimum guarantees
echo "$HTML" | grep -q "Latest from CMS"
echo "$HTML" | grep -q "Latest News"
echo "$HTML" | grep -q "Latest Analysis"
echo "$HTML" | grep -q "Latest Explainers"

echo "[ci-smoke] homepage assertions passed"
