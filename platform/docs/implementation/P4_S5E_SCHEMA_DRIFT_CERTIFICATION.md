# P4-S5E — Live Schema Drift Certification

**Status:** Live staging schema externally inspected / repository migration matched / Prisma runtime still pending  
**Environment:** staging  
**Provider:** Neon Postgres  
**Database:** `neondb`

## Objective

Verify that the real staging PostgreSQL schema matches the durable persistence contract already authored in the repository, independently of the still-blocked Prisma CLI runtime.

## External evidence

The live `neikos-hub-staging` database was queried directly through the connected Neon control plane. The inspection confirmed:

- all four expected durable tables exist;
- all twelve expected columns exist;
- `id`, `payload`, and `updatedAt` match the repository migration contract;
- all four primary keys exist on `id`;
- the only indexes are the four primary-key indexes expected from the migration;
- no unexpected functional schema drift was found;
- prior certification test rows remain fully cleaned up.

PostgreSQL 18 may expose NOT NULL enforcement through internal constraint metadata. That representation does not change the functional repository contract.

## Boundary truth

This certification proves the live PostgreSQL schema matches the authored migration at the database-contract level. It does **not** claim that `prisma validate`, `prisma generate`, `prisma migrate deploy`, Prisma Client E2E, the exact Next.js production build, or exact-candidate Vercel deployment have executed.

Those gates remain pending until a package-capable Node execution environment is available.
