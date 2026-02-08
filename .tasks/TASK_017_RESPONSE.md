# TASK_017 Response

**Task:** Create Data Freshness Badge
**Project:** PROJ-2026-0208-macropulse-v2
**Date:** 2026-02-08
**Status:** COMPLETE

## File Created

**`components/data-freshness.tsx`** - Data freshness indicator badge

### Features
- **Status States:**
  - **Fresh** (< 4h): Green badge with checkmark
  - **Stale** (4-24h): Amber badge with clock icon
  - **Very Stale** (> 24h): Red badge with alert icon
  - **Unavailable** (null): Gray badge with alert icon
- **Relative Time:** Shows "Scraped X hours ago"
- **Customizable Threshold:** Default 4 hours, configurable via `thresholdHours` prop
- **Icons:** Visual indicators for each state

### Props
```typescript
interface DataFreshnessProps {
  lastUpdated: string | null  // ISO timestamp
  thresholdHours?: number     // Default: 4
  className?: string
}
```

### Usage Example
```tsx
<DataFreshness lastUpdated="2024-03-15T10:30:00Z" />
// Shows: "Scraped 3h ago" (green badge)

<DataFreshness lastUpdated="2024-03-14T10:30:00Z" thresholdHours={12} />
// Shows: "Scraped 25h ago" (amber/red badge)

<DataFreshness lastUpdated={null} />
// Shows: "Data unavailable" (gray badge)
```

## Acceptance Criteria Met

- ✅ Shows time since last scrape ("Scraped X hours ago")
- ✅ Warning icon when data stale/unavailable (Clock, AlertCircle icons)
- ✅ Conditional rendering based on data age (4 color states)
