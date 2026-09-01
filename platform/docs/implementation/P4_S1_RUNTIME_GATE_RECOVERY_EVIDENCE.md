# P4-S1 Runtime Gate Recovery Evidence

**Date:** 2026-08-16
**Status:** Local executable baseline revalidated; Prisma/PostgreSQL/Next.js production-wiring worktree not recovered in this runtime.

## Executed successfully

- `npm install --ignore-scripts` — PASS; dependency graph is currently zero-external-dependency and npm reported 0 vulnerabilities.
- `npm test` — PASS; 31/31 tests, 0 failures.
- `npm run validate:repo` — PASS; 30 required paths / 23 workspace packages.
- `npm run validate:readiness` — PASS.
- `npm run validate:staging` — PASS; 13 required artifacts.
- `npm run smoke:staging` — PASS; 7/7 checks.
- `npm run smoke:failure-recovery` — PASS; ready -> not_ready -> ready.
- `npm run smoke:load` — PASS; 200 requests / 0 failures; observed 1126.16 req/s, p95 57.78 ms in this execution environment.

## Runtime tooling observed

- Node.js: v22.16.0
- npm: 10.9.2
- Docker: unavailable
- Podman: unavailable
- `psql`: unavailable
- PostgreSQL server binary: unavailable

## Truth boundary

The recovered persistent NEIKOS branch is the P4-S1 local-staging runtime. It does not contain `schema.prisma`, Prisma package dependencies, or a Next.js application/build script. Therefore the previously stated production-wiring chain:

`Prisma -> PostgreSQL -> Next.js production build -> API integration -> E2E`

cannot be truthfully executed against this recovered branch. Those gates remain pending until the exact V4 production-wiring repository is available again. This evidence does not convert local staging into production validation or release approval.
