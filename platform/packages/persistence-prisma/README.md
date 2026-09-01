# @neikos/persistence-prisma

Authoring implementation of the durable PostgreSQL persistence boundary for NEIKOS HUB.

It preserves the existing keyed-repository contract while storing complete domain records as JSON payloads in PostgreSQL. Prisma 7 uses the `prisma-client` generator and the PostgreSQL driver adapter. Database credentials are supplied only through `DATABASE_URL` at runtime.

Runtime gate sequence:

```bash
npm install
npm --prefix packages/persistence-prisma run prisma:validate
npm --prefix packages/persistence-prisma run prisma:generate
npm --prefix packages/persistence-prisma run prisma:migrate:deploy
```

A real PostgreSQL connection is required for migration deployment and live readiness evidence.
