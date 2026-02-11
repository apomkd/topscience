# topscience — Known Good Baseline (Only what actually worked)

Last updated: 2026-02-11 (Europe/Amsterdam)

Purpose: Reuse these exact steps when rebuilding, to avoid repeating failed attempts.

---

## 1) Server baseline that worked

- OS: Ubuntu 24.04
- Kernel: `6.8.0-100-generic`
- Docker: `29.2.1`
- Docker Compose: `v5.0.2`
- UFW active with:
  - `22/tcp ALLOW`
  - `80/tcp ALLOW`
  - `443/tcp ALLOW`

---

## 2) ClawHub toolchain that worked

Problem encountered:
- `clawhub` failed on Node 18 (`Unexpected token 'with'`, requires Node >=20)

Working fix:
1. Install Node 22
2. Install clawhub globally
3. Verify with `clawhub --help`

Installed local skills (working):
- `docker-compose 1.0.0`
- `vps 1.0.0`
- `nextjs 1.0.0`

---

## 3) Critical formatting lesson (very important)

Most failures came from multiline YAML being collapsed into one line in chat copy/paste.

What works reliably:
- Use **JSON one-liners** to write `docker-compose.yml`
- Avoid multiline YAML pastes through chat when possible

---

## 4) Minimal compose smoke test that worked

This confirmed Docker Compose was functioning correctly:

```bash
echo '{"services":{"hello":{"image":"alpine:3.20","command":["sh","-c","echo ok && sleep 3600"]}}}' > /opt/topscience/docker-compose.yml
docker compose -f /opt/topscience/docker-compose.yml up -d
docker compose -f /opt/topscience/docker-compose.yml ps
```

Result: container `topscience-hello-1` started successfully.

---

## 5) CMS image lesson

What failed:
- `strapi/strapi:latest` (pull access denied)
- `strapi/strapi:4.25.12` (pull access denied)

What worked:
- `directus/directus:10.13.1`

Directus started successfully with logs:
- `Server started at http://0.0.0.0:8055`

---

## 6) Current known-good service ports

- Web placeholder: `3000`
- CMS (Directus): `8055`
- Postgres internal: `5432`
- Redis internal: `6379`

---

## 7) Known-good architecture for P0 (current)

- VPS hosting
- Docker Compose orchestration
- CMS: Directus
- DB: PostgreSQL
- Cache: Redis
- Web app: Node/Next.js placeholder active, scaffold pending

---

## 8) Immediate hardening tasks after first successful boot

1. Change temporary admin password in Directus
2. Rotate Directus `KEY` and `SECRET`
3. Optionally close public CMS port (`8055`) and move behind reverse proxy/domain

---

## 9) Rebuild shortcut (recommended order)

1. Verify Docker/Compose/UFW
2. Write compose using JSON one-liner (not multiline YAML)
3. `docker compose config`
4. `docker compose pull`
5. `docker compose up -d`
6. Check logs and health

---

## 10) Notes to future runs

- Execute commands **one by one** (not chained in one line in chat)
- Validate after each major step before continuing
- Prefer deterministic, chat-safe command formats
