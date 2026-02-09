# RETRO — PROJ-2026-0208-macropulse-v2

**Project:** Macro Pulse v2 — Unified macro economics dashboard
**Date:** 2026-02-08
**Domain:** Engineering (primary), Finance (data relevance)
**Complexity:** 4/5 (matched estimate)

---

## Summary

Unified two existing projects — tradingecoscraper (Python async scraper) and macro-pulse (Next.js FRED dashboard) — into a single monorepo with daily GitHub Actions cron, Vercel Blob storage, and ISR revalidation. Deployed to Vercel at macro-pulse-v2.vercel.app.

**Metrics:** 27 tasks completed | 7 agents | 11 architectural decisions | QA Integration PASS | QA E2E CONDITIONAL PASS

---

## Patterns to Repeat

1. **Comprehensive architectural decision documentation (11 ADRs)** — Blob storage, data flow, type mirroring, fallback strategy, monorepo structure, GitHub Actions, dual data sources, layout, ISR + on-demand revalidation, component architecture, mock data. Zero rework caused by architectural ambiguity.

2. **Parallel agent execution** — Python scraper migration, TypeScript data layer, and Next.js frontend components were developed concurrently by 3 specialist agents. Dependencies were correctly sequenced in the decomposition.

3. **Inline fallback data in JSX** — Global Markets section had hardcoded fallback data directly in the component JSX (not just `getMockData()`). This was the only section that showed data on initial production deploy. Should be the pattern for all sections.

4. **Monorepo with clear boundaries** — Python in `scraper/`, Next.js in `app/`+`components/`+`lib/`. Independent dependency management (requirements.txt vs package.json). Independent CI workflows.

---

## Failures with Root Cause Analysis

### 1. Empty array mock data bypass (Post-delivery bug — P0)

**Symptom:** US Economic Indicators and US Treasury Yield Curve sections showed blank on production.

**Root Cause:** `getAllIndicators()` returns `[]` (empty array) when FRED API key is missing or invalid, not `null`. The fallback logic only checked `!indicators` (nullish), but `![]` is `false` in JavaScript. Empty arrays are truthy.

**Fix:** Added `.length === 0` checks alongside null checks.

**Lesson:** Defensive fallback checks should test for both nullish AND empty collection states. This is a class of bug — any function returning `Collection | null` where the Collection can also be empty needs both checks.

**Pattern candidate:** YES — "Empty collection bypass" (PAT-NEW). Applies to any data pipeline with fallback logic.

### 2. Vercel deploy agent blocked by OAuth (P1)

**Symptom:** vercel-deploy agent couldn't complete `vercel login` — requires interactive browser authentication.

**Root Cause:** Vercel CLI's OAuth device flow requires a human to visit a URL and authorize. Automated agents cannot complete browser-based auth flows.

**Fix:** Manual browser login by Human Operator, then re-triggered agent.

**Lesson:** Any deployment target requiring OAuth browser flow needs pre-configured tokens (API tokens, not session-based auth). Agents should check for existing auth before attempting login.

**Pattern candidate:** YES — "OAuth agent boundary" (PAT-NEW). Deployment agents need pre-provisioned tokens, not interactive auth.

### 3. Missing vercel-deploy agent in initial staffing (P1)

**Symptom:** Project reached delivery phase with no deployment capability. Had to add vercel-deploy agent mid-project.

**Root Cause:** The PROJECT_BRIEF specified Vercel deployment, and HR Protocol v4 Rule 20 requires a vercel-deploy agent when tech stack implies Vercel. But the initial staffing request omitted it, and HR didn't catch the gap.

**Fix:** Filed additive staffing request mid-project.

**Lesson:** Caine's pre-flight checklist should explicitly check: "Does the tech stack imply Vercel deployment? If yes, is vercel-deploy in the staffing request?" HR should also enforce Rule 20 more strictly.

---

## Wrong Assumptions

| Assumption | Reality |
|-----------|---------|
| `null` check sufficient for empty data fallback | Empty arrays bypass `!value` checks — need `.length` check too |
| Agents can complete OAuth browser flows | OAuth device flow requires human browser interaction |
| Deployment agent can be added post-delivery | Worked, but caused delay; should be in initial team |
| QA E2E can run without dependencies installed | 62 Python tests failed due to missing pip dependencies in test env |

---

## New Capabilities Developed

1. **Python + Next.js monorepo pattern** — Reusable for future projects combining Python data pipelines with Next.js frontends
2. **Vercel Blob integration** — Data pipeline: scraper → Blob → dashboard. Reusable for any project needing scheduled data uploads
3. **ISR + webhook revalidation** — Dual revalidation strategy (time-based + on-demand) applicable to any dashboard project
4. **Scraper type mirroring** — Manual Pydantic → TypeScript mapping pattern. Lightweight alternative to codegen for small schemas

---

## Efficiency Metrics

| Metric | Value |
|--------|-------|
| Total tasks | 27 |
| QA pass rate (first attempt) | 1/2 (Integration PASS, E2E CONDITIONAL) |
| Rework cycles | 1 (post-delivery bug fix) |
| Escalations | 1 (vercel-deploy OAuth) |
| Architectural decisions | 11 |
| Tool/infra failures | 2 (OAuth, empty array fallback) |

---

## Team Performance

| Agent | Assessment |
|-------|-----------|
| project-lead | Effective decomposition, good rework advisory |
| python-cli-dev | Clean scraper migration (Tasks 1-5, 22) |
| typescript-dev | Data layer + types (Tasks 6-10) |
| nextjs-frontend-dev | 11 component tasks, all delivered (Tasks 11-21) |
| qa-engineer | Caught integration issues, thorough reports |
| scribe | 11 ADRs documented comprehensively |
| git-commit-agent | Clean initial commit + release tag |
| vercel-deploy | Blocked by OAuth, completed after manual auth |

**Optimal team size for this complexity:** 7 agents was appropriate. The 3 specialist split (Python, TypeScript, Next.js) matched the monorepo boundaries well.

**Underutilized roles:** None. **Missing roles:** vercel-deploy (initially).

---

## System Improvement Recommendations

1. **Add empty-collection fallback check to QA checklist** — Any data pipeline with fallbacks should be tested with both `null` and `[]` inputs.
2. **Pre-provision Vercel auth tokens** — Store in `~/.openclaw/.env` alongside other secrets. vercel-deploy agent should use token-based auth, not interactive OAuth.
3. **Enforce HR Protocol v4 Rule 20 in Caine's pre-flight** — Add explicit "Vercel deploy agent?" checkbox to staffing pre-flight when tech stack includes Next.js + Vercel.
4. **Update PROJECT_BRIEF template** — Add "Deployment Target" field that auto-triggers vercel-deploy requirement.

---

*Retrospective compiled by: project-lead*
*Validated by: [pending DC review]*
*Project: PROJ-2026-0208-macropulse-v2*
