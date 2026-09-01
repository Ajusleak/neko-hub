# P4-S5A — Persistence Provider Certification

**Environment:** staging  
**Provider:** Neon Postgres  
**Project:** `neikos-hub-staging`  
**Database:** `neondb`  
**Status:** PostgreSQL provider path externally executed; Prisma CLI / Next.js execution still pending

## What is now externally proven

The connected staging PostgreSQL service was reached successfully and reported PostgreSQL 18.4. The public schema was initially empty. The exact four-table durable record schema represented by the repository migration was then executed against staging.

A live data-cycle test was executed against every durable repository table:

- locker record: create/read PASS;
- collection record: create/read PASS;
- wishlist record: create/read PASS;
- asset record: create/read PASS;
- locker update/read-back PASS;
- cleanup delete PASS;
- post-cleanup residue check PASS (zero certification rows remain).

## Truth boundary

This evidence promotes the PostgreSQL provider, schema-execution, connectivity, and durable SQL CRUD gates to PASS.

It does **not** promote the following gates:

- Prisma dependency installation;
- `prisma validate`;
- `prisma generate`;
- `prisma migrate deploy` as a CLI execution;
- Prisma-client-backed E2E;
- Next.js dependency installation;
- Next.js production compilation.

Those remain pending until the dependency-bearing Node runtime can reach npm or an equivalent reproducible package source.

## Evidence artifact

See `docs/release/P4_S5A_NEON_POSTGRES_STAGING_EVIDENCE.json`.
