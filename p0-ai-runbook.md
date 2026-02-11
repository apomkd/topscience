# topscience.news — P0 AI-First Operational Runbook (Day 1–14)

Version: 1.0  
Status: READY_FOR_START  
Mode: AI-led (minimal human input)

---

## 0) Objective
Execute P0 end-to-end with AI as primary operator, while human provides only critical approvals.

### P0 Scope (locked)
1. Core UX (homepage + article page + responsive)
2. CMS content model + editorial workflow + RBAC
3. SEO + AI foundation
4. Performance foundation
5. Security foundation
6. Analytics foundation

### Out of scope (P1/P2)
- Personalization, comments, monetization, multilingual

---

## 1) Governance Model (who controls what)

## 1.1 Agent Control Plane
- Orchestrator AI: planning, delegation, status, risk, go/no-go proposal
- Architecture AI: stack decisions, quality standards
- Backend/API AI: CMS, API, data layer
- Frontend/UX AI: UI system + templates
- SEO+AI AI: metadata/schema/sitemaps/AI-readable structure
- Editorial AI: style/factual quality policy enforcement
- Security AI: hardening + scans + release security gate
- Performance AI: CWV + caching + optimization
- Analytics AI: events + dashboards + data QA
- QA/Release AI: final integrated validation

## 1.2 Human approvals (minimum)
Only 3 approval checkpoints:
1. Policy pack approval (one time)
2. Infrastructure credential authorization (one time)
3. Production launch GO/NO-GO (final)

---

## 2) Repository + Folder Structure (double-checked baseline)

Use monorepo:

```text
topscience/
  apps/
    web/                     # Next.js frontend
    cms/                     # Headless CMS
  packages/
    ui/                      # shared components/design tokens
    config/                  # eslint/tsconfig/shared configs
    schemas/                 # content schemas, zod/types
  infra/
    docker/
    k8s/                     # optional if k8s route
    terraform/               # optional infra-as-code
    cloudflare/              # cache/waf rules docs/scripts
  ops/
    ci/                      # pipeline templates
    runbooks/                # incident/release/playbooks
    scripts/                 # migrations/checks/smoke tests
  docs/
    p0-scope-lock.md
    architecture-decisions.md
    editorial-policy.md
    seo-ai-guidelines.md
    security-baseline.md
    analytics-event-taxonomy.md
    release-gates-checklist.md
```

Mandatory branches:
- `main` (production)
- `develop` (integration)
- `feature/*`
- `hotfix/*`

---

## 3) Environments (strict)

- `dev`: rapid AI iteration
- `staging`: full gate validation
- `prod`: public

Required env vars (minimum set):
- App: `NEXT_PUBLIC_SITE_URL`, `API_BASE_URL`
- CMS: `CMS_DB_URL`, `CMS_JWT_SECRET`
- Security: `WAF_API_KEY`, `RATE_LIMIT_SECRET`
- Analytics: `ANALYTICS_WRITE_KEY`
- Infra: `CDN_ZONE_ID`, `OBJECT_STORAGE_BUCKET`

Rule: No secret in repo. Secrets only via secret manager.

---

## 4) Day-by-Day Execution Plan

## Day 1 — Initialization & controls
- Lock scope in `docs/p0-scope-lock.md`
- Generate policy pack (editorial, SEO/AI, security, release gates)
- Setup monorepo, branch protections, PR template
- Setup CI baseline: lint + unit test + build + dependency scan

Exit criteria:
- Policy pack ready for human approval
- PR to `develop` auto-runs CI

## Day 2 — Infra + environment readiness
- Configure dev/staging/prod
- Connect domain plan:
  - staging.topscience.news
  - topscience.news
- Add CDN and HTTPS baseline

Exit criteria:
- Staging reachable over HTTPS
- Secrets injected via manager (not plaintext)

## Day 3 — CMS schema foundation
- Implement content types: Article, Category, Tag, Author, Source, TopicCluster
- Add article mandatory fields:
  - slug, headline, dek, body
  - key_findings, why_it_matters, sources[]
  - featured_image, publish_at, status, seo_meta
- Implement workflow states + transitions

Exit criteria:
- CMS schema versioned and migration-tested

## Day 4 — RBAC + editorial workflow automation
- Roles: Writer, FactChecker, Editor, SEOReviewer, Admin
- Enforce state transitions by role
- Add audit logging for content changes

Exit criteria:
- Role tests pass (authorized/unauthorized actions)

## Day 5 — Frontend skeleton (web app)
- Next.js app setup + shared UI package
- Build homepage skeleton sections
- Build article template layout

Exit criteria:
- Pages render with mock data on all target breakpoints

## Day 6 — CMS integration + real content binding
- Connect frontend to CMS API
- Dynamic routes for articles/categories
- Seed 15–20 science articles in staging

Exit criteria:
- Real CMS content visible in web app

## Day 7 — SEO + AI structure layer
- Auto metadata (title, description, OG, canonical)
- Add schema.org (NewsArticle, Breadcrumb, Organization)
- Add robots.txt + sitemap.xml + news-sitemap.xml
- Ensure article template has Key Findings / Why It Matters / Sources

Exit criteria:
- Structured data validation passes on staging

## Day 8 — Performance pass #1
- Implement image optimization (AVIF/WebP)
- Font optimization and preload strategy
- ISR/SSR caching strategy
- Edge cache rules + purge strategy

Exit criteria:
- Lab CWV in acceptable range (pre-target)

## Day 9 — Security hardening pass #1
- Security headers (HSTS, CSP, XFO, XCTO, Referrer-Policy)
- Rate limiting, login throttling, API abuse controls
- WAF baseline rules
- Dependency + SAST scans in CI

Exit criteria:
- No critical security findings

## Day 10 — Analytics instrumentation
- Event taxonomy implementation:
  - page_view, article_open, scroll_50, scroll_90,
  - article_complete, outbound_source_click, newsletter_signup
- Dashboard MVP build
- Timezone/data consistency checks

Exit criteria:
- Dashboard receiving valid staging traffic

## Day 11 — Integrated E2E tests
- Critical user flows automated:
  1) homepage -> article -> source click
  2) publish from CMS -> visible on homepage
  3) sitemap refresh after publish
- Start 48h staging soak with synthetic traffic

Exit criteria:
- E2E suite green; soak started

## Day 12 — Soak monitoring + fixes
- Monitor error rates, latency, security alerts
- Fix regressions from soak
- Re-run gate checks

Exit criteria:
- 24h stable metrics with no critical incidents

## Day 13 — Release candidate freeze
- Code freeze for P0
- Final gate audit package generated
- QA/Release AI issues go/no-go recommendation

Exit criteria:
- Release candidate tagged

## Day 14 — Production launch
- Human final GO/NO-GO
- Canary rollout (10% -> 50% -> 100%)
- Live monitoring war-room (AI-led)

Exit criteria:
- 72h stability plan active

---

## 5) Automated Release Gates (must all be GREEN)

1. Editorial Quality Gate
- Source completeness: 100%
- Template compliance: 100%

2. SEO/AI Gate
- Metadata completeness: 100%
- Structured data critical errors: 0

3. Performance Gate
- LCP < 2.0s
- INP < 200ms
- CLS < 0.1

4. Security Gate
- Critical vulns: 0
- Security headers score: pass target

5. Analytics Gate
- Required events firing rate > 98%
- No major dedup/timezone anomalies

If any gate = RED -> auto hold deployment.

---

## 6) AI Autonomy Rules (to reduce human intervention)

- Auto-merge only when: tests + scans + gates pass
- Auto-rollback when:
  - error rate exceeds threshold
  - latency breach sustained
  - security alert severity critical
- Auto-escalate to human only for:
  - legal/compliance ambiguity
  - domain/DNS credential actions
  - final production GO decision

---

## 7) Daily Operating Cadence

- 09:00 CET: AI standup summary (done/next/blockers)
- 13:00 CET: Midday risk check (perf/security)
- 18:00 CET: EOD executive brief

Brief format:
1. Completed today
2. Open risks
3. Required human action (if any)

---

## 8) Start Checklist (ready-to-run)

Before Day 1 starts, confirm:
- [ ] Domain access available
- [ ] Hosting/CDN accounts available
- [ ] Secret manager available
- [ ] Human approver identified
- [ ] P0 scope accepted

If all checked -> status = START AUTHORIZED.

---

## 9) Definition of Success for P0

P0 is complete only if:
- Site is live and stable
- Content pipeline is autonomous with guardrails
- Security/performance/SEO/analytics gates are green
- Human intervention remained limited to defined approvals

---

## 10) Immediate next action

Execute Day 1 tasks exactly in order and produce first AI executive brief at 18:00 CET.

---

## 11) Adaptive Execution Memory Loop (flexible structure)

Operational mode: **Plan -> Execute -> Collect feedback -> Replan -> Delegate**

Mastermind (Orchestrator AI) responsibilities:
1. Reads feedback from all specialist agents at end of each cycle
2. Re-scores priorities (impact/risk/time)
3. Rewrites next-day plan based on real execution data
4. Delegates updated tasks with owner + deadline + gate
5. Escalates to human only for defined approval checkpoints

Mandatory artifacts per day:
- `ops/runbooks/day-N-eod.md` (what happened)
- `ops/runbooks/day-N-plus-1-plan.md` (updated plan)
- `ops/runbooks/risk-register.md` (new/closed risks)
- `ops/runbooks/delegation-log.md` (who owns what)

Rule:
- No fixed multi-day rigidity.
- Day N+1 is finalized only after Day N feedback is analyzed.
- Structure stays controlled, but execution remains flexible.
