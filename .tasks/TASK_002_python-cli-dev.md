# TASK_002_python-cli-dev

**Title:** Create Vercel Blob Upload Script
**Project:** PROJ-2026-0208-macropulse-v2
**Assigned Agent:** python-cli-dev
**Created:** 2026-02-08

## Description
Create `scraper/upload.py` with HTTP PUT to Vercel Blob REST API. Reads JSON output, uploads to `scraper-data/latest.json`.

## Files to Create/Modify
- `scraper/upload.py`

## Dependencies
TASK_001

## Acceptance Criteria
- `upload_to_blob(json_path: str)` function works
- Returns success/error with appropriate logging

## RESPONSE Format
Write a `TASK_002_RESPONSE.md` with:
```markdown
# TASK_002 Response

**Status:** COMPLETE | BLOCKED | FAILED

**Summary:** Brief description of what was done

**Files Created:**
- path/to/file1
- path/to/file2

**Blockers (if any):**
- None or describe dependencies needed
```

Then place this file at: `~/Projects/macro-pulse-v2/.tasks/TASK_002_RESPONSE.md`
