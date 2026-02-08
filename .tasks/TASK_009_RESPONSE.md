# TASK_009 Response

**Status:** COMPLETE

**Summary:** Created `app/api/revalidate/route.ts` POST endpoint that validates the `secret` query parameter against `REVALIDATION_SECRET` environment variable and calls `revalidatePath('/')` to invalidate the Next.js cache for the dashboard page. Returns 401 for invalid/missing secret, 200 on success.

**Files Created:**
- `~/Projects/macro-pulse-v2/app/api/revalidate/route.ts`

**Blockers (if any):**
- None
