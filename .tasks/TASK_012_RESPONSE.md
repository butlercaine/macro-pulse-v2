# TASK_012 Response

**Task:** Create Market Table Component
**Project:** PROJ-2026-0208-macropulse-v2
**Date:** 2026-02-08
**Status:** COMPLETE

## File Created

**`components/market-table.tsx`** - Sortable market instruments table

### Features
- Sortable columns: Symbol, Name, Price, Change, % (click headers)
- Color-coded change values: green (positive) / red (negative)
- Responsive design with horizontal scroll
- Hover effects on rows and sortable headers
- Visual sort indicators (arrow icons)

### Props
```typescript
interface MarketInstrument {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume?: string
}
```

### Usage Example
```tsx
<MarketTable
  instruments={[
    { symbol: "SPY", name: "SPDR S&P 500 ETF", price: 512.34, change: 2.15, changePercent: 0.42 },
    { symbol: "QQQ", name: "Invesco QQQ Trust", price: 445.67, change: -1.23, changePercent: -0.28 },
  ]}
/>
```

## Acceptance Criteria Met

- ✅ Table renders all market instruments (symbol, name, price, change, %)
- ✅ Color-coded change values (green/red using cn() utility)
- ✅ Responsive layout (overflow-x-auto wrapper)
