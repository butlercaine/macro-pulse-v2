# TASK_019 Response Redesign Dashboard Page

**Task:**
**Project:** PROJ-2026-0208-macropulse-v2
**Date:** 2026-02-08
**Status:** COMPLETE

## File Modified

**`app/page.tsx`** - Complete dashboard redesign

### Changes Made

1. **Added new imports:**
   - `SectionHeader` - collapsible section wrapper
   - `MarketTable` - sortable market instruments table
   - `MacroWorldGrid` - 13-country responsive grid
   - `NewsFeed` - categorized news feed
   - `getScraperData` - fetch from Vercel Blob storage
   - Types from `@/lib/scraper-types`

2. **Data fetching:**
   - Fetches FRED data (indicators + yield curve) in parallel with scraper data
   - Falls back to mock data if API/storage unavailable
   - Handles errors gracefully with user notification

3. **6 collapsible sections:**
   - **US Economic Indicators** - `IndicatorGrid` with 6 cards
   - **US Treasury Yield Curve** - `YieldCurveSection` with chart
   - **Global Markets** - 2-panel layout (Indices + Crypto) using `MarketTable`
   - **Global Macro Overview** - 13-country grid using `MacroWorldGrid`
   - **Market News** - categorized feed using `NewsFeed`

4. **Data transformation:**
   - Transforms scraper market instruments for `MarketTable`
   - Merges news categories (Market Headlines, Earnings, Dividends)
   - Falls back to mock news if scraper data unavailable

### Components Used

| Section | Component |
|---------|-----------|
| Section wrapper | `SectionHeader` |
| US Indicators | `IndicatorGrid` |
| Yield Curve | `YieldCurveSection` |
| Markets (2 panels) | `MarketTable` (2 instances) |
| Global Macro | `MacroWorldGrid` |
| News | `NewsFeed` |

## Acceptance Criteria Met

- ✅ Fetches FRED data (existing `getAllIndicators`, `getYieldCurve`)
- ✅ Fetches scraper data (`getScraperData` from Vercel Blob)
- ✅ All 6 sections rendered:
  1. US Indicators
  2. Yield Curve
  3. Markets (6 panels - split as Indices + Crypto for responsive)
  4. Global Macro (13 countries)
  5. News (3 categories: Market Headlines, Earnings, Dividends)
- ✅ All sections collapsible (`SectionHeader` component with Radix Collapsible)
