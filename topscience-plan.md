# topscience.news — Strategija i Plan (dosеga)

## User Goal
Kreiranje struktura na botovi so razlicni karakteri koi rabotat paralelno za pobrza, pokontrolirana i podobra izgradba na seriozen internet news portal:
- Domain/idea: **topscience.news**
- Fokus: latest science news
- Kvaliteti: bogat/moderen izgled + jaka vnatrešna arhitektura
- Non-functional requirements: **fast, responsive, secure, scalable, SEO and AI friendly**

---

## 1) Core bot team (karakter + uloga)

1. **Chief Architect (analiticen)**
   - Arhitektura, standardi, skalabilnost, cache strategii.

2. **News Research Bot (ljubopiten naucnicen)**
   - Izvori, validacija, kategorizacija po tema.

3. **Editorial Bot (precizen urednik)**
   - Fact-check, stil, neutralnost, anti-hallucination pravila.

4. **SEO + GEO Bot (market-inteligenten)**
   - SEO struktura, schema, internal linking, AI discoverability.

5. **Frontend UX Bot (kreativen dizajner)**
   - Moderen UI, responsive, accessibility, dark/light mode.

6. **Performance Bot (opsesiven za brzina)**
   - Core Web Vitals, optimizacii, CDN/edge cache.

7. **Security Bot (cuvar)**
   - OWASP, WAF, RBAC, audit logs, scanning.

8. **Backend/API Bot (stabilnost)**
   - CMS model, API sloj, search index, queues.

9. **Data/Analytics Bot (metriki)**
   - KPI, dashboard, A/B test, content scoring.

10. **Orchestrator Bot (menadzer)**
   - Koordinacija, sprint plan, QA gates, release approvals.

---

## 2) Parallel workflow lanes

- **Lane A: Content pipeline**  
  Research → Fact-check → Editorial → SEO enrich → Publish queue

- **Lane B: Product pipeline**  
  UX/UI → Frontend → Performance tuning → Accessibility QA

- **Lane C: Platform pipeline**  
  Backend/API → Security hardening → Infra scaling → Monitoring

- **Lane D: Growth pipeline**  
  SEO strategy → Topic clusters → Analytics feedback → Iteration

---

## 3) Preporacan tech stack

- Frontend: **Next.js (App Router), TypeScript, Tailwind**
- CMS: **Headless CMS** (Strapi / Sanity / Payload)
- DB/cache: **PostgreSQL + Redis**
- Search: **Meilisearch** ili **OpenSearch**
- Infra: **Docker + Kubernetes** (ili managed), **Cloudflare CDN**, object storage
- Security: WAF, JWT + RBAC, secrets manager
- Observability: OpenTelemetry + Grafana/Prometheus + Sentry
- CI/CD: GitHub Actions + test gates + staged rollout

---

## 4) SEO + AI friendly praksa

- Semantic HTML + clean URLs
- Schema: NewsArticle, Organization, Breadcrumb, FAQ
- XML sitemaps (news + standard), robots controls
- Entity-first pisuvanje
- LLM-friendly blokovi: “Key findings”, “Why it matters”, “Sources”
- Stroga citation policy

---

## 5) Organogram (reporting)

### Executive
- **Orchestrator Bot** → reportira do Human Product Lead/Founder
- **Chief Architect Bot** → reportira do Orchestrator

### Content & Editorial
- News Research Bot → Editorial Bot
- Editorial Bot → Orchestrator
- SEO + GEO Bot → Orchestrator

### Product & Experience
- Frontend UX Bot → Chief Architect
- Performance Bot → Chief Architect

### Platform & Security
- Backend/API Bot → Chief Architect
- Security Bot → Orchestrator (nezavisna kontrola)
- Data/Analytics Bot → Orchestrator

### Release gate (mora site GREEN)
1. Editorial quality pass
2. SEO/GEO pass
3. Performance pass
4. Security pass
5. Analytics instrumentation pass

---

## 6) MVP backlog so prioriteti

### P0 (must-have)
1. Brand + Core UX (homepage, article template, mobile-first)
2. Content model + CMS workflow + roles
3. SEO/AI foundation (metadata, schema, sitemap, canonical, source blocks)
4. Performance core (CDN, image optimize, ISR/SSR)
5. Security core (headers, WAF, RBAC, rate limit, backup/restore)
6. Analytics core (events + basic dashboard)

### P1 (high)
1. Advanced search + filters
2. Light personalization
3. Newsletter MVP
4. Editorial assist features
5. Accessibility hardening (WCAG AA)

### P2 (growth)
1. Multi-language
2. Community layer
3. Science explainers hub
4. Monetization
5. Advanced AI distribution snippets

---

## 7) Sprint sequence

- Sprint 1–2: P0 foundations
- Sprint 3: Performance + analytics + QA gates
- Sprint 4: Soft launch + bugfix + content seeding
- Sprint 5+: P1 growth

---

## Note
Ovoj fajl ja memorira dosегашnata diskusija i predlog-strukturata za **topscience.news**.
