# P4-S1 — Local Staging Deployment Harness

**Status:** Implemented / Self-Validated Locally  
**Authority state:** Authoring; not approved or baselined  
**Purpose:** Convert the Priority 3 provider-neutral implementation into a runnable staging-style process without inventing external infrastructure.

## What this phase adds

- Node.js HTTP runtime for liveness, readiness, release metadata, search/home, locker writes, and wishlist writes.
- Explicit local-staging adapter composition using volatile in-memory repositories and fixtures.
- Request-header identity simulator restricted to local staging.
- A local deployment profile and environment template.
- OCI/Docker image definition and Docker Compose staging topology.
- Automated staging smoke, local load smoke, and readiness failure/recovery checks.

## Safety boundary

The local-staging adapter set is **non-production by construction**. `server-entry.mjs` refuses to start this adapter composition when `NEIKOS_ENV=production`. Header-based identity, fixture Fortnite data, echo AI, and memory persistence are test/staging mechanisms only.

## Run directly with Node

```bash
set -a
. infra/environments/local-staging.env.example
set +a
node apps/web/src/server-entry.mjs
```

Then validate:

```bash
curl -fsS http://127.0.0.1:3000/health/live
curl -fsS http://127.0.0.1:3000/health/ready
curl -fsS 'http://127.0.0.1:3000/api/v1/home?q=Fox'
```

## Container topology

`infra/container/Dockerfile` and `infra/container/docker-compose.staging.yml` define the intended container execution shape. They are authored but cannot be claimed container-runtime validated unless Docker/Podman is actually available and the image is built and run.

## Validation commands

```bash
npm test
npm run validate:repo
npm run validate:readiness
npm run validate:staging
npm run smoke:staging
npm run smoke:failure-recovery
npm run smoke:load
```

## External gates intentionally still pending

- approved external staging hosting target;
- production-grade identity adapter;
- durable persistence;
- external events/notifications;
- authorized Fortnite adapter;
- approved AI provider;
- secret manager;
- observability backend;
- formal security review;
- external staging smoke/failure/load evidence;
- rollback drill against deployed infrastructure;
- release approval and baseline.
