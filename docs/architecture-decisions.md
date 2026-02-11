# Architecture Decisions (Day 1)
- Monorepo structure: apps/, packages/, infra/, ops/, docs/
- Web: Next.js app in apps/web
- CMS: Directus in apps/cms (runtime via Docker)
- Data: PostgreSQL + Redis (compose-managed)
- CI baseline: lint/typecheck/test/build placeholders active
