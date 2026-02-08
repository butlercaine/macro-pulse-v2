# DECOMPOSITION — PROJ-2026-0208-macropulse-v2

**Project:** Macro Pulse v2 — Unified Dashboard + Scraper
**Phases:** (1) Repo Setup, (2) Data Layer, (3) UI Components, (4) Page Assembly, (5) Deploy
**Team:** python-cli-dev, nextjs-frontend-dev, typescript-dev
**Created:** 2026-02-08

---

## Phase 1: Repo Setup + Scraper Migration

### TASK_001_python-cli-dev
**Title:** Initialize Monorepo Structure
**Description:** Create Next.js + Python monorepo structure. Copy existing macro-pulse Next.js files (app/, components/, lib/, config files) and tradingecoscraper Python files into new structure per PROJECT_BRIEF.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/scraper/` (copy from tradingecoscraper)
- `~/Projects/macro-pulse-v2/app/` (copy from macro-pulse)
- `~/Projects/macro-pulse-v2/components/` (copy from macro-pulse)
- `~/Projects/macro-pulse-v2/lib/` (copy from macro-pulse)
- `~/Projects/macro-pulse-v2/package.json`, `next.config.ts`, `tsconfig.json`
- `~/Projects/macro-pulse-v2/.env.example`
**Dependencies:** none
**Acceptance Criteria:**
- All source files from both projects present
- `npm install` runs without errors
- Python environment ready

### TASK_002_python-cli-dev
**Title:** Create Vercel Blob Upload Script
**Description:** Create `scraper/upload.py` with HTTP PUT to Vercel Blob REST API. Reads JSON output, uploads to `scraper-data/latest.json`.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/scraper/upload.py`
**Dependencies:** TASK_001
**Acceptance Criteria:**
- `upload_to_blob(json_path: str)` function works
- Returns success/error with appropriate logging

### TASK_003_python-cli-dev
**Title:** Modify Scraper Entry Point for Blob Upload
**Description:** Update `scraper/__main__.py` to accept `--blob` flag. When set, uploads output JSON to Vercel Blob after scraping.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/scraper/__main__.py`
**Dependencies:** TASK_002
**Acceptance Criteria:**
- `python -m scraper --blob` runs scraper + uploads
- Returns exit code 0 on success

### TASK_004_python-cli-dev
**Title:** Create GitHub Actions Scraper Workflow
**Description:** Create `.github/workflows/scrape.yml` with daily cron (06:00 UTC), runs scraper with --blob, triggers revalidation webhook.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/.github/workflows/scrape.yml`
**Dependencies:** TASK_003
**Acceptance Criteria:**
- Workflow runs on schedule and manual trigger
- Uploads to Vercel Blob
- Hits revalidation endpoint

### TASK_005_python-cli-dev
**Title:** Create GitHub Actions CI Workflow
**Description:** Create `.github/workflows/ci.yml` with lint + type-check on PRs. Runs ruff/flake8 and npm run type-check.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/.github/workflows/ci.yml`
**Dependencies:** TASK_001
**Acceptance Criteria:**
- Lint passes on Python files
- Type-check passes on TypeScript files

---

## Phase 2: Dashboard Data Layer

### TASK_006_typescript-dev
**Title:** Create TypeScript Scraper Types
**Description:** Create `lib/scraper-types.ts` with interfaces mirroring Python Pydantic models: MarketInstrument, ScraperMacroIndicator, ScraperNewsArticle, ScraperData.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/lib/scraper-types.ts`
**Dependencies:** TASK_001
**Acceptance Criteria:**
- Types mirror JSON output from scraper
- All fields typed correctly

### TASK_007_typescript-dev
**Title:** Create Scraper Data Fetch Module
**Description:** Create `lib/scraper-data.ts` with `getScraperData()` function. Fetches JSON from Vercel Blob, returns parsed data or null.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/lib/scraper-data.ts`
**Dependencies:** TASK_006
**Acceptance Criteria:**
- Fetches from Vercel Blob URL
- Returns typed ScraperData
- Graceful handling when Blob unavailable

### TASK_008_typescript-dev
**Title:** Create Mock Scraper Data
**Description:** Create `lib/scraper-mock.ts` with realistic mock data for development without Blob credentials.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/lib/scraper-mock.ts`
**Dependencies:** TASK_006
**Acceptance Criteria:**
- All categories populated (markets, macro, news)
- Realistic values matching FRED scale

### TASK_009_typescript-dev
**Title:** Create Revalidation Webhook Route
**Description:** Create `app/api/revalidate/route.ts` POST endpoint. Validates secret, calls Next.js revalidatePath.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/app/api/revalidate/route.ts`
**Dependencies:** TASK_001
**Acceptance Criteria:**
- POST /api/revalidate works with valid secret
- Returns 401 for missing/invalid secret
- Revalidates the dashboard page

### TASK_010_typescript-dev
**Title:** Add Vercel Blob Dependency
**Description:** Add `@vercel/blob` to package.json for Blob SDK (or use fetch REST API).
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/package.json`
**Dependencies:** TASK_001
**Acceptance Criteria:**
- `@vercel/blob` installed (or REST API used)
- No package conflicts

---

## Phase 3: New UI Components

### TASK_011_nextjs-frontend-dev
**Title:** Create Collapsible Section Header
**Description:** Create `components/section-header.tsx` with chevron icon, collapsible state, proper ARIA attributes.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/components/section-header.tsx`
- `~/Projects/macro-pulse-v2/components/ui/collapsible.tsx` (shadcn primitive)
**Dependencies:** TASK_001
**Acceptance Criteria:**
- Chevron rotates on expand/collapse
- Keyboard accessible
- Smooth animation

### TASK_012_nextjs-frontend-dev
**Title:** Create Market Table Component
**Description:** Create `components/market-table.tsx` with sortable columns for markets section (symbol, name, price, change, %).
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/components/market-table.tsx`
**Dependencies:** TASK_011
**Acceptance Criteria:**
- Table renders all market instruments
- Color-coded change values (green/red)
- Responsive layout

### TASK_013_nextjs-frontend-dev
**Title:** Create Macro Country Card
**Description:** Create `components/macro-country-card.tsx` displaying one country's key indicators (GDP, CPI, Unemployment).
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/components/macro-country-card.tsx`
**Dependencies:** TASK_001
**Acceptance Criteria:**
- Card shows country flag + name
- 3 indicator values per country
- Compact design for grid layout

### TASK_014_nextjs-frontend-dev
**Title:** Create Macro World Grid
**Description:** Create `components/macro-world-grid.tsx` responsive grid of all 13 country cards.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/components/macro-world-grid.tsx`
**Dependencies:** TASK_013
**Acceptance Criteria:**
- 13 country cards in responsive grid
- Mobile: 1 column, Tablet: 2, Desktop: 4
- All 13 countries present

### TASK_015_nextjs-frontend-dev
**Title:** Create News Card Component
**Description:** Create `components/news-card.tsx` displaying single news article (title, summary, timestamp).
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/components/news-card.tsx`
**Dependencies:** TASK_001
**Acceptance Criteria:**
- Article title, summary, timestamp
- External link to full article
- Clean card design

### TASK_016_nextjs-frontend-dev
**Title:** Create News Feed Component
**Description:** Create `components/news-feed.tsx` categorized list of news cards (Market Headlines, Earnings, Dividends).
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/components/news-feed.tsx`
**Dependencies:** TASK_015
**Acceptance Criteria:**
- Categories filterable or tabbed
- All news categories rendered
- Empty state handling

### TASK_017_nextjs-frontend-dev
**Title:** Create Data Freshness Badge
**Description:** Create `components/data-freshness.tsx` displaying "Scraped X hours ago" or "Data unavailable" warning.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/components/data-freshness.tsx`
**Dependencies:** TASK_007
**Acceptance Criteria:**
- Shows time since last scrape
- Warning icon when data stale/unavailable
- Conditional rendering based on data age

---

## Phase 4: Page Assembly

### TASK_018_nextjs-frontend-dev
**Title:** Update Dashboard Header
**Description:** Modify `components/dashboard-header.tsx` to include data freshness badge and updated subtitle.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/components/dashboard-header.tsx`
**Dependencies:** TASK_017
**Acceptance Criteria:**
- Header shows "Macro Pulse" title
- Data freshness badge visible
- Subtitle updated

### TASK_019_nextjs-frontend-dev
**Title:** Redesign Dashboard Page
**Description:** Rewrite `app/page.tsx` to fetch both FRED + scraper data, render all sections in single scrollable layout with collapsible sections.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/app/page.tsx`
**Dependencies:** TASK_007, TASK_010, TASK_014, TASK_016, TASK_018
**Acceptance Criteria:**
- Fetches FRED data (existing)
- Fetches scraper data (new)
- All 6 sections: US Indicators, Yield Curve, Markets (6 panels), Global Macro, News (3 categories)
- All sections collapsible

### TASK_020_nextjs-frontend-dev
**Title:** Update Loading States
**Description:** Update `app/loading.tsx` with skeleton placeholders for all new sections.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/app/loading.tsx`
**Dependencies:** TASK_019
**Acceptance Criteria:**
- Skeletons match final section layouts
- Smooth transition from skeleton to content

### TASK_021_nextjs-frontend-dev
**Title:** Update Page Metadata
**Description:** Update `app/layout.tsx` metadata for unified dashboard.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/app/layout.tsx`
**Dependencies:** TASK_019
**Acceptance Criteria:**
- Title: "Macro Pulse — US Economy + Global Markets"
- Description: "Daily economic indicators from FRED + Trading Economics"

---

## Phase 5: Deploy

### TASK_022_python-cli-dev
**Title:** Environment Variables Documentation
**Description:** Document all required env vars in .env.example: FRED_API_KEY, BLOB_READ_WRITE_TOKEN, REVALIDATION_SECRET.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/.env.example`
**Dependencies:** TASK_004, TASK_009
**Acceptance Criteria:**
- All 3 env vars documented
- Placeholder values for secrets

### TASK_023_qa-engineer
**Title:** Phase 1-4 Integration QA
**Description:** Verify all integrations work: scraper runs, Blob uploads, dashboard fetches data, all components render.
**Dependencies:** TASK_005, TASK_010, TASK_017
**Acceptance Criteria:**
- Scraper pipeline works (manual trigger)
- Blob contains valid JSON
- Dashboard shows scraper data
- All sections collapsible

### TASK_024_qa-engineer
**Title:** End-to-End Verification
**Description:** Full E2E test: trigger scrape → verify Blob update → verify dashboard refresh → check all sections.
**Dependencies:** TASK_019
**Acceptance Criteria:**
- ISR revalidation works
- Data freshness updates
- No console errors

### TASK_025_scribe
**Title:** Architecture Decisions Log
**Description:** Document key decisions: Blob storage choice, data flow, type mirroring strategy, fallback approach.
**Files to create/modify:**
- `~/Projects/macro-pulse-v2/DECISIONS.md`
**Dependencies:** TASK_019, TASK_023
**Acceptance Criteria:**
- 10+ decisions documented
- Rationale + alternatives for each

### TASK_026_git-commit-agent
**Title:** Initial Commit + Push
**Description:** Git init, commit all files, create remote, push to `butlercaine/macro-pulse-v2`.
**Dependencies:** TASK_025
**Acceptance Criteria:**
- All files committed with descriptive messages
- Remote added and pushed

### TASK_027_git-commit-agent
**Title:** Create Release Tag
**Description:** Tag v1.0.0 after successful deploy verification.
**Dependencies:** TASK_024, TASK_026
**Acceptance Criteria:**
- Tag created at commit
- GitHub release created

---

## Dependencies Map

```
Phase 1 (TASK_001-005) → Phase 2 (TASK_006-010)
                                    ↓
Phase 3 (TASK_011-017) ←────────────┤
                                    ↓
Phase 4 (TASK_018-021) ←─────────────┤
                                    ↓
Phase 5 (TASK_022-027) ←────────────┘
```

**Critical Path:** TASK_001 → TASK_006 → TASK_007 → TASK_019 → TASK_023 → TASK_026 → TASK_027
