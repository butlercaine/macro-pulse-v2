# TASK_005 Response

**Status:** COMPLETE

**Summary:** Created `.github/workflows/ci.yml` with lint + type-check on PRs. Runs ruff for Python linting, pyright for type-checking, and npm run lint + type-check for TypeScript.

---

## Files Created

| File | Location |
|------|----------|
| `ci.yml` | `~/Projects/macro-pulse-v2/.github/workflows/ci.yml` |

---

## Workflow Triggers

| Trigger | Description |
|---------|-------------|
| `pull_request` | Runs on PRs to main/develop |
| `push` | Runs on pushes to main/develop |

---

## Jobs

### lint-and-types

| Step | Command | Purpose |
|------|---------|---------|
| Python setup | `pip install ruff flake8` | Linting tools |
| Python lint | `ruff check .` | Lint Python files |
| Python format check | `ruff format --check .` | Check code format |
| Python type check | `pyright .` | Type checking |
| Node setup | `npm ci` | Install dependencies |
| TypeScript check | `npm run type-check` | TypeScript types |
| ESLint | `npm run lint` | Lint JS/TS |

---

## Python Tools

| Tool | Purpose |
|------|---------|
| `ruff` | Fast Python linter |
| `ruff format` | Code formatter |
| `pyright` | Type checker |

---

## Expected package.json Scripts

```json
{
  "scripts": {
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Blockers

None - workflow file created successfully.
