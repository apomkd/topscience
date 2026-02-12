# Autonomy Operator Quickstart

## Start staging
./ops/scripts/staging-up.sh

## Stop staging
./ops/scripts/staging-down.sh

## Check staging health
./ops/scripts/staging-status.sh

Expected:
- web: 200
- cms: 302

Notes:
- Use Hostinger OpenClaw container as single master runtime.
- Do not manually kill openclaw processes unless in controlled recovery.
