# P4-S2 — Durable Runtime Wiring

**Status:** Implemented / locally contract-validated / external runtime dependencies pending  
**Date:** 2026-08-16  
**Authority state:** Authoring — not approved or baselined

## Objective

Advance the NEIKOS HUB runtime gate from volatile local-staging persistence toward a production-capable PostgreSQL + Prisma boundary and a separately buildable Next.js production web target without weakening existing fail-closed behavior.

## Implemented

- `@neikos/persistence-prisma` workspace package.
- PostgreSQL Prisma schema for locker, collections, wishlist, and asset keyed records.
- Prisma 7 config with `DATABASE_URL` supplied only at runtime.
- PostgreSQL driver-adapter client factory.
- `PrismaKeyedRepository` preserving the existing in-memory repository contract (`get`, `list`, `upsert`, `delete`, `has`, `clear`).
- Prisma repository composition and database readiness check.
- `@neikos/web-next` Next.js production web shell.
- Standalone Next.js deployment output configuration.
- `/health/live` and `/meta/build` route handlers.
- P4-S2 structural validator and repository-contract tests.

## Local evidence

- Automated tests: **33 passed / 0 failed**.
- Repository validator: **PASS — 30 required paths / 25 workspace packages**.
- P3 production-readiness artifact validator: **PASS**.
- P4-S1 local-staging artifact validator: **PASS**.
- P4-S2 wiring validator: **PASS — 10 required artifacts**.

## Runtime gate evidence

The current execution container has Node.js 22.16.0 but no PostgreSQL server/client and no Docker/Podman container engine. An actual `npm install` attempt for the Prisma workspace was made and timed out while waiting on registry resolution. Therefore the following are intentionally **not** claimed:

- Prisma CLI installation complete;
- `prisma validate` executed;
- Prisma Client generated;
- PostgreSQL migration deployed;
- PostgreSQL readiness query passed;
- Next.js dependency installation complete;
- `next build` executed;
- database-backed API integration passed;
- database-backed E2E passed.

## Gate sequence when dependency/network + PostgreSQL are available

```bash
npm --prefix packages/persistence-prisma install
npm --prefix packages/persistence-prisma run prisma:validate
npm --prefix packages/persistence-prisma run prisma:generate
npm --prefix packages/persistence-prisma run prisma:migrate:deploy
npm --prefix apps/web-next install
npm --prefix apps/web-next run build
```

Database-backed API/E2E evidence must follow those successful executions; build success alone is not database readiness.
