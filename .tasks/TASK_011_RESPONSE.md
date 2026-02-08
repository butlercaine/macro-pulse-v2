# TASK_011 Response

**Task:** Create Collapsible Section Header
**Project:** PROJ-2026-0208-macropulse-v2
**Date:** 2026-02-08
**Status:** COMPLETE

## Files Created

1. **`components/ui/collapsible.tsx`** - shadcn/ui primitive wrapping @radix-ui/react-collapsible
   - Exports: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`

2. **`components/section-header.tsx`** - Collapsible section header with chevron
   - Rotating chevron icon on expand/collapse
   - ARIA attributes handled by Radix primitive
   - Smooth CSS animations (accordion-down/up)
   - Props: `title`, `description`, `defaultOpen`, `className`, `children`

## Modifications

- **`app/globals.css`** - Added accordion animations
  - `@keyframes accordion-down`
  - `@keyframes accordion-up`
  - `.animate-accordion-down` and `.animate-accordion-up` classes

## Acceptance Criteria Met

- ✅ Chevron rotates on expand/collapse (via `rotate-180` class on trigger)
- ✅ Keyboard accessible (Radix handles all ARIA attributes)
- ✅ Smooth animation (CSS keyframes with 0.2s ease-out)
