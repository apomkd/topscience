#!/usr/bin/env bash
set -euo pipefail
URL="${1:-}"
if [[ -z "$URL" ]]; then
echo "Usage: auto-draft-from-url.sh <source_url>"
exit 1
fi
/opt/topscience/.venv-ai/bin/python /opt/topscience/ops/scripts/auto-draft-from-url.py "$URL"
