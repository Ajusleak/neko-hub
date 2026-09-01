# P4-S1 Local Validation Summary

**Date:** 2026-08-16  
**Scope:** Local staging-style execution only  
**Release authority:** None; evidence is self-validation and does not constitute approval.

## Results

| Gate | Result |
|---|---|
| Automated tests | PASS — 31/31 |
| Repository structure | PASS — 30 required paths / 23 workspaces |
| P3 production-readiness artifacts | PASS |
| P4 local-staging artifacts | PASS — 13 required artifacts |
| HTTP smoke | PASS — 7/7 |
| Readiness failure/recovery | PASS — 200 → 503 → 200 |
| Local process load smoke | PASS — 200 requests / 0 failures |
| Container build/run | NOT EXECUTED — container engine unavailable |
| External staging deployment | PENDING |
| Formal security review | PENDING |
| Rollback drill | PENDING |
| Release approval | PENDING |

## Load-smoke observation

The final local run observed **1215.63 req/s** with **p95 56.64 ms** across 200 requests and zero failures. The recorded load-smoke JSON contains throughput and latency observed in the current execution environment. It must not be interpreted as a production SLO, capacity limit, or benchmark.

## Entrypoint execution check

The actual `apps/web/src/server-entry.mjs` process was started from the local-staging environment template on a loopback port. It reported the expected staging deployment/release metadata; `/health/live` returned live, `/health/ready` returned ready with all seven adapter checks, and `/api/v1/home?q=Fox` returned fixture-backed search results.

## Repository size at packaging

- Files: 164 (excluding transient `.validation` logs)
- Directories: 69 (excluding transient `.validation` directory)
- Workspace packages: 23
