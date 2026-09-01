# Infrastructure

**Status:** Priority 3 production-readiness boundary / provider-neutral authoring.

No cloud, identity vendor, datastore, queue, notification service, Fortnite integration mechanism, AI provider, or observability vendor is declared by this repository without an approved architecture decision.

## P3-I12 artifacts

- `contracts/adapter-contract.mjs` — concrete adapter readiness contract.
- `contracts/deployment-profile.mjs` — deployment-profile validation.
- `contracts/deployment-profile.schema.json` — machine-readable profile shape.
- `environments/staging.example.json` — non-deployable staging template.
- `environments/production.example.json` — non-deployable production template.

The example profiles intentionally contain placeholders and pending gates. They must fail a release validation until replaced with approved environment-specific values and evidence.
