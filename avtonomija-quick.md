# AVTONOMIJA QUICK — 1-page Checklist (Verified)

Updated: 2026-02-11
Goal: repeatable OpenClaw + VPS + Git + staging setup.

## 1) VPS baseline
- aiops user
- aiops in sudo,docker
- NOPASSWD sudo
Check:
- sudo -n whoami => root
- docker ps works

## 2) Git key test (definitive)
- Ensure exact public key in GitHub Deploy Keys (write enabled)
- Test:
GIT_SSH_COMMAND='ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes' git ls-remote git@github.com:apomkd/topscience.git

## 3) Gateway alignment
- gateway.mode=local
- gateway.auth.token == gateway.remote.token
- Probe:
openclaw gateway probe --token <TOKEN> => Reachable yes, RPC ok

If unauthorized loops:
- check PID owner on 18789
- stop root respawn source:
sudo loginctl disable-linger root
sudo pkill -u root -f '^/usr/lib/systemd/systemd --user$'

## 4) Update
- sudo npm install -g openclaw@latest
- openclaw --version (verified: 2026.2.9)

## 5) Staging
- Use branch: chore/day2-staging-bootstrap
- .env.staging from example
- docker compose config (validate)
- docker compose up -d

If port conflicts:
- stop/remove legacy containers on 3000/8055
- re-run compose up

If cms has no host port:
- force recreate cms:
docker compose ... up -d --force-recreate --no-deps cms

## 6) Final health
- curl -I http://127.0.0.1:3000 => 200
- curl -I http://127.0.0.1:8055 => 302 (/admin)
