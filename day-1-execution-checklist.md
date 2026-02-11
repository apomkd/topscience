# topscience.news — Day 1 Execution Checklist (09:00–18:00 CET)

Status target: DAY_1_COMPLETE  
Owner: Orchestrator AI  
Mode: AI-led, minimal human input

---

## 09:00–09:20 — Kickoff Control Window

### 1) Confirm startup prerequisites
- [ ] Domain access confirmed (topscience.news)
- [ ] Hosting/CDN access confirmed
- [ ] Secret manager available
- [ ] Human approver reachable today

### 2) Lock P0 scope
- [ ] Create/confirm `docs/p0-scope-lock.md`
- [ ] Confirm P0 includes only:
  - Core UX
  - CMS model/workflow/RBAC
  - SEO+AI base
  - Performance base
  - Security base
  - Analytics base
- [ ] Explicitly exclude P1/P2 items

**Exit criteria:** Scope locked and no pending ambiguity.

---

## 09:20–10:20 — Repo + Branch Governance

### 3) Monorepo baseline
- [ ] Confirm repo root structure:
  - `apps/web`
  - `apps/cms`
  - `packages/ui`
  - `packages/schemas`
  - `infra/`
  - `ops/`
  - `docs/`

### 4) Branch and PR controls
- [ ] Ensure branches exist: `main`, `develop`
- [ ] Protect `main` (no direct push)
- [ ] Enforce PR reviews for merge
- [ ] Add PR template with gate checklist

### 5) Commit standards
- [ ] Enable conventional commits
- [ ] Add CODEOWNERS (Architecture/Security/QA reviewers)

**Exit criteria:** Controlled merge policy active.

---

## 10:20–11:20 — CI Pipeline Baseline

### 6) CI jobs (minimum)
- [ ] Lint
- [ ] Type-check
- [ ] Unit tests
- [ ] Build
- [ ] Dependency vulnerability scan

### 7) CI enforcement
- [ ] Failing checks block merge to `develop`
- [ ] CI status badge/log visible

**Exit criteria:** First test PR fails/passes correctly by design.

---

## 11:20–12:00 — Policy Pack Generation (AI)

### 8) Generate required docs in `/docs`
- [ ] `architecture-decisions.md`
- [ ] `editorial-policy.md`
- [ ] `seo-ai-guidelines.md`
- [ ] `security-baseline.md`
- [ ] `release-gates-checklist.md`
- [ ] `analytics-event-taxonomy.md`

### 9) Internal consistency check
- [ ] Terminology aligned across all docs
- [ ] No conflicting rules between editorial/security/SEO

**Exit criteria:** Policy pack ready for one-time human approval.

---

## 12:00–12:20 — Human Approval Window #1

### 10) Submit compressed approval packet
- [ ] Send one summary (max 1 page equivalent)
- [ ] Ask for: Approve / Minor revise / Reject
- [ ] Record decision in `docs/approvals-log.md`

**Exit criteria:** Policy pack approved (or revision task created with owner + ETA).

---

## 12:20–13:00 — Environment Skeleton

### 11) Define environments
- [ ] `dev`
- [ ] `staging`
- [ ] `prod`

### 12) Env contract file
- [ ] Create `.env.example` for web/cms
- [ ] Mark secrets as required but blank
- [ ] Document source-of-truth for secrets manager

**Exit criteria:** Environment contract finalized.

---

## 13:00–13:20 — Midday Risk Check

### 13) Risk review
- [ ] CI stability risk
- [ ] Security baseline gap risk
- [ ] Missing credential blockers

### 14) Mitigation assignment
- [ ] Assign owner + deadline per risk

**Exit criteria:** No unowned blocker.

---

## 13:20–14:20 — Security & Secrets Controls

### 15) Secrets hygiene
- [ ] Add gitignore rules for secrets
- [ ] Add pre-commit secret scan
- [ ] Verify no secret leaked in commit history

### 16) Dependency policy
- [ ] Lockfile required
- [ ] Block critical vulnerability merges

**Exit criteria:** Security baseline enforceable in pipeline.

---

## 14:20–15:20 — Release Gate Automation Stub

### 17) Create gate framework (stubs today, full wiring Day 7–12)
- [ ] Editorial gate placeholder
- [ ] SEO gate placeholder
- [ ] Performance gate placeholder
- [ ] Security gate placeholder
- [ ] Analytics gate placeholder

### 18) Gate decision logic
- [ ] Any RED => deploy hold
- [ ] All GREEN => eligible for release pipeline

**Exit criteria:** Gate orchestration logic committed.

---

## 15:20–16:20 — Observability Baseline

### 19) Logging and monitoring skeleton
- [ ] Structured app logs
- [ ] Error tracking integration placeholder
- [ ] Basic uptime check

### 20) Alert policy draft
- [ ] Define severity levels: low/medium/high/critical
- [ ] Define auto-escalation for critical only

**Exit criteria:** Minimum observability path exists.

---

## 16:20–17:00 — Double-Check Audit (mandatory)

### 21) Structural audit
- [ ] Folder structure matches runbook exactly
- [ ] Required docs all present
- [ ] Branch protections active
- [ ] CI checks enforced
- [ ] Security pre-commit scan active

### 22) Contradiction audit
- [ ] No conflicting DoD definitions
- [ ] No conflicting approval flows

**Exit criteria:** “Ready for Day 2” certificate generated.

---

## 17:00–18:00 — Day-End Executive Brief

### 23) Generate EOD brief (`ops/runbooks/day-1-eod.md`)
Include:
1. Completed items (with evidence links)
2. Open blockers
3. Risk register update
4. Human actions needed tomorrow (if any)

### 24) Update status board
- [ ] Mark Day 1 as Complete / Partial / Blocked
- [ ] If Partial/Blocked: include recovery plan for Day 2 first 90 minutes

**Exit criteria:** EOD brief delivered and archived.

---

## Day 1 Success Criteria (hard pass/fail)

Day 1 = PASS only if all true:
- [ ] P0 scope locked
- [ ] Policy pack approved (or revisions formally tracked)
- [ ] Repo governance active
- [ ] CI baseline active and blocking failures
- [ ] Secrets/security hygiene controls active
- [ ] Release gate framework initialized
- [ ] EOD executive brief delivered

If any unchecked => Day 1 = PARTIAL and recovery plan required.

---

## Quick Command Checklist (operator shorthand)

- [ ] Validate repo tree
- [ ] Validate branch protections
- [ ] Run CI on test PR
- [ ] Validate docs presence
- [ ] Validate secret scan
- [ ] Validate gate hold logic
- [ ] Publish EOD brief

---

## Immediate next after Day 1
Proceed to Day 2 (Infra + staging HTTPS + secrets injection + domain routing prep).
