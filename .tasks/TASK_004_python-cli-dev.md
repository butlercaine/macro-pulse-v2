# TASK_004_python-cli-dev

**Title:** Create GitHub Actions Scraper Workflow
**Project:** PROJ-2026-0208-macropulse-v2
**Assigned Agent:** python-cli-dev
**Created:** 2026-02-08

## Description
Create `.github/workflows/scrape.yml` with daily cron (06:00 UTC), runs scraper with --blob, triggers revalidation webhook.

## Files to Create/Modify
- `.github/workflows/scrape.yml`

## Dependencies
TASK_003

## Acceptance Criteria
- Workflow runs on schedule and manual trigger
- Uploads to Vercel Blob
- Hits revalidation endpoint

## RESPONSE Format
Write a `TASK_004_RESPONSE.md` with:
```markdown
# TASK_004 Response

**Status:** COMPLETE | BLOCKED | FAILED

**Summary:** Brief description of what was done

**Files Created:**
- path/to/file1

**Blockers (if any):**
- None or describe dependencies needed
```

Then place this file at: `~/Projects/macro-pulse-v2/.tasks/TASK_004_RESPONSE.md`
