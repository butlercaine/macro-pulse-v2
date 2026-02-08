# TASK_015 Response

**Task:** Create News Card Component
**Project:** PROJ-2026-0208-macropulse-v2
**Date:** 2026-02-08
**Status:** COMPLETE

## File Created

**`components/news-card.tsx`** - News article card component

### Features
- Article title with hover state
- Summary with line-clamp (2 lines max)
- Source and publication timestamp
- Optional category badge
- External link with icon
- Hover effects: shadow increase, border highlight

### Props
```typescript
interface NewsArticle {
  id: string
  title: string
  summary: string
  source: string
  url: string
  publishedAt: string
  category?: string
}
```

### Usage Example
```tsx
<NewsCard
  article={{
    id: "1",
    title: "Fed Signals Rate Cut",
    summary: "Federal Reserve officials indicated...",
    source: "Bloomberg",
    url: "https://...",
    publishedAt: "2024-03-15T10:30:00Z",
    category: "Monetary Policy"
  }}
/>
```

## Acceptance Criteria Met

- ✅ Article title, summary, timestamp
- ✅ External link to full article (opens in new tab)
- ✅ Clean card design (uses Card UI primitive, hover states, icons)
