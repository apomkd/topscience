#!/usr/bin/env bash
set -euo pipefail
max=30
for i in $(seq 1 $max); do
web=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000 || true)
cms=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8055 || true)
if [ "$web" = "200" ] && [ "$cms" = "302" ]; then
echo "healthy: web=$web cms=$cms"
exit 0
fi
sleep 1
done
echo "timeout: web=${web:-000} cms=${cms:-000}"
exit 1
