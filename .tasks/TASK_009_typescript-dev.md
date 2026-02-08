# TASK_009_typescript-dev

**Title:** Create Revalidation Webhook Route
**Project:** PROJ-2026-0208-macropulse-v2
**Assigned Agent:** typescript-dev
**Created:** 2026-02-08

## Description
Create `app/api/revalidate/route.ts` POST endpoint. Validates secret, calls Next.js revalidatePath.

## Files to Create/Modify
- `app/api/revalidate/route.ts`

## Dependencies
TASK_001

## Acceptance Criteria
- POST /api/revalidate works with valid secret
- Returns 401 for missing/invalid secret
- Revalidates the dashboard page

## RESPONSE Format
Write a `TASK_009_RESPONSE.md` with:
```markdown
# TASK_009 Response

**Status:** COMPLETE | BLOCKED | FAILED

**Summary:** Brief description of what was done

**Files Created:**
- path/to/file1

**Blockers (if any):**
- None or describe dependencies needed
```

Then place this file at: `~/Projects/macro-pulse-v2/.tasks/TASK_009_RESPONSE.md`
