# P4-S4 — External Runtime Execution Harness

**Status:** Implemented / Locally self-validated / External execution pending
**Authority:** Authoring only; no production approval or baseline claim

## Objective

Provide a deterministic internet-enabled execution path for the durable-runtime gates that cannot execute in the current authoring container because outbound npm DNS resolution, PostgreSQL binaries, and a container engine are unavailable.

## Added

- `scripts/runtime-preflight.mjs` records package-registry, PostgreSQL/client, container-engine, and `DATABASE_URL` prerequisites without treating missing infrastructure as success.
- `scripts/runtime-install.mjs` installs the Prisma and Next.js runtime workspaces in a fixed order.
- `.github/workflows/runtime-gate.yml` defines an isolated Node 22 job with a PostgreSQL 17 service and executes the complete runtime gate chain.
- Runtime evidence under `.validation/` is uploaded from the workflow even on failure.
- `pg` is pinned to `8.16.3` rather than a floating compatible range.

## External execution sequence

1. install runtime dependencies;
2. repository validation and regression tests;
3. Prisma schema validation;
4. Prisma Client generation;
5. PostgreSQL migration deployment;
6. PostgreSQL-backed E2E CRUD;
7. Next.js production build;
8. full `runtime:gate` evidence capture.

## Truth boundary

This workflow is an execution harness, not execution evidence. The Prisma/PostgreSQL/Next.js gates remain blocked until the workflow or another equivalent internet-enabled environment actually runs and records PASS results.
