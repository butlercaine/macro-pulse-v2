# PROJECT BRIEF — PROJ-2026-0208-macropulse-v2

## Overview
Unify two existing projects into a single monorepo:
- **tradingecoscraper** — Python async scraper for tradingeconomics.com (market data, macro indicators for 13 countries, news)
- **macro-pulse** — Next.js 16 dashboard for US economic indicators + yield curve (FRED API)

## Goal
Single macro-pulse repo where:
1. GitHub Actions cron runs Python scraper daily → uploads JSON to Vercel Blob
2. Next.js dashboard fetches from Vercel Blob + FRED API
3. Single scrollable page with collapsible sections for all data

## Architecture
- **Scraper Pipeline**: GitHub Actions → Python scraper → Vercel Blob (latest.json)
- **Dashboard**: Next.js (ISR 24h) → fetches Blob + FRED → renders unified page
- **Storage**: Vercel Blob (500MB free, ~20KB JSON file)
- **Revalidation**: Webhook POST to /api/revalidate after each scrape

## Key Files
- `scraper/` — Python scraper from tradingecoscraper
- `app/page.tsx` — Unified dashboard page
- `lib/scraper-types.ts` — TypeScript interfaces mirroring Python Pydantic models
- `lib/scraper-data.ts` — Blob fetch + mock fallback
- `.github/workflows/scrape.yml` — Daily cron workflow

## Constraints
- Keep Python scraper as-is (~1200 lines, tested)
- Vercel Blob for data storage (no database)
- Single JSON snapshot updated daily
- Graceful degradation when Blob unavailable

## Complexity
**4/5** — Significant integration work, new data layer, 7 new UI components, data model mapping, deployment pipeline

## Domain
Engineering (primary), Finance (data relevance)

## Success Criteria
1. Scraper runs daily via GitHub Actions → uploads to Vercel Blob
2. Dashboard displays FRED data + scraper data on single page
3. All sections collapsible
4. Graceful fallback to mock data when Blob unavailable
5. ISR revalidation works (new data appears within minutes after scrape)

## Source Projects
- `/Users/caine/Projects/tradingecoscraper/` — completed v1.0.0, v1.1.0 enhancements
- `/Users/caine/Projects/macro-pulse/` — existing Vercel deployment

## Notes
- Architecture decision (GitHub Actions + Vercel Blob) already validated
- Python rewrite rejected (too much tested BeautifulSoup/lxml code)
- Vercel Python serverless rejected (45s+ scrape exceeds 10s timeout)
