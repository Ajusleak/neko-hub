# NEIKOS HUB Next.js web shell

Production-build target for the runtime gate. This shell intentionally does not claim durable API readiness until PostgreSQL migrations and Prisma runtime checks pass.

```bash
npm install
npm --prefix apps/web-next run build
```
