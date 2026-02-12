# AVTONOMIJA — Setup Log, Greški i Proven Playbook

Last updated: 2026-02-11 (Europe/Amsterdam)
Context: topscience autonomous setup (OpenClaw + VPS + Git + staging runtime)

## 1) Cel
Postignata cel:
- стабилен VPS пристап (aiops + sudo + docker)
- стабилен Git read/write пристап (deploy key)
- стабилен OpenClaw gateway пристап (token auth + reachable)
- staging runtime кренат (web/cms/postgres/redis)

## 2) Najgolemi greški i root causes
- Команди во една линија -> невалидни резултати (fix: 1 команда = 1 Enter)
- Погрешна претпоставка дека /opt/topscience е валиден repo (fix: clean clone)
- Deploy key mismatch (fix: exact ~/.ssh/id_ed25519.pub во GitHub Deploy Key)
- /opt permissions (fix: sudo + chown aiops)
- Gateway unauthorized/token mismatch (root runtime context)
- Root respawn loop преку systemd --user (fix: disable linger root + kill root user manager)
- openclaw update без sudo (fix: sudo npm install -g openclaw@latest)
- Branch mismatch: staging assets се на chore/day2-staging-bootstrap
- Port conflicts: legacy topscience-web/topscience-cms на 3000/8055
- CMS Up without ports: required force recreate на cms service

## 3) Proven checks
- Git: GIT_SSH_COMMAND='ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes' git ls-remote git@github.com:apomkd/topscience.git
- Gateway: openclaw gateway probe --token <TOKEN> => Reachable yes, RPC ok
- Version: openclaw --version => 2026.2.9
- Staging:
- curl -I http://127.0.0.1:3000 => 200 OK
- curl -I http://127.0.0.1:8055 => 302 Found (/admin)

## 4) Current verified state
- OpenClaw updated and operational
- Gateway reachable with token auth
- Repo functional on VPS
- Staging services operational: web, cms, postgres, redis
- Active staging branch: chore/day2-staging-bootstrap

## 5) Anti-waste rules
- Never paste prompt text in commands
- One command per line on critical setup
- If failure repeats 2x, pause and find root cause (owner/branch/port/config)
- Validate with hard checks (probe/curl/inspect), not assumptions
