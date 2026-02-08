# TASK_003_python-cli-dev

**Title:** Modify Scraper Entry Point for Blob Upload
**Project:** PROJ-2026-0208-macropulse-v2
**Assigned Agent:** python-cli-dev
**Created:** 2026-02-08

## Description
Update `scraper/__main__.py` to accept `--blob` flag. When set, uploads output JSON to Vercel Blob after scraping.

## Files to Create/Modify
- `scraper/__main__.py`

## Dependencies
TASK_002

## Acceptance Criteria
- `python -m scraper --blob` runs scraper + uploads
- Returns exit code 0 on success

## RESPONSE Format
Write a `TASK_003_RESPONSE.md` with:
```markdown
# TASK_003 Response

**Status:** COMPLETE | BLOCKED | FAILED

**Summary:** Brief description of what was done

**Files Modified:**
- path/to/file1

**Blockers (if any):**
- None or describe dependencies needed
```

Then place this file at: `~/Projects/macro-pulse-v2/.tasks/TASK_003_RESPONSE.md`
