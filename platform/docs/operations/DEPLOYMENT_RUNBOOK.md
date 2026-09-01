# NEIKOS Deployment Runbook

**Status:** Draft / Review Required

## Preconditions

1. Select an approved deployment target and concrete adapters through the architecture/review process.
2. Produce a non-template deployment profile conforming to `infra/contracts/deployment-profile.schema.json`.
3. Store credentials only in the approved secret manager and reference them indirectly.
4. Record release version and immutable deployment ID.
5. Complete the security review gate before production promotion.

## Staging sequence

1. Run `npm test`.
2. Run `npm run validate:repo`.
3. Run `npm run validate:readiness`.
4. Validate the staging deployment profile.
5. Deploy the exact release candidate artifact.
6. Confirm `/health/live` returns HTTP 200.
7. Confirm `/health/ready` returns HTTP 200 and every critical adapter is healthy.
8. Execute authenticated read/mutation smoke paths, event delivery, analytics/audit capture, and authorized provider calls.
9. Exercise a controlled dependency failure and verify readiness drops to 503 and recovers after the dependency returns.
10. Execute load/capacity validation against the approved SLO.
11. Execute the rollback drill.
12. Attach evidence and mark the corresponding deployment profile gates passed.

## Production promotion

1. Confirm the staging artifact digest/version matches the production candidate.
2. Confirm all deployment profile gates except final approval are passed.
3. Obtain recorded release approval.
4. Run the release validator against the final profile.
5. Deploy using the approved rollout strategy.
6. Verify liveness, readiness, logs, metrics, traces, events, and user-critical flows.
7. Stop promotion and roll back on any critical readiness, authorization, data-integrity, or provider-contract failure.

## Evidence to retain

- artifact version/digest;
- deployment ID;
- adapter versions;
- secret reference names, never secret values;
- test and validator output;
- security review record;
- smoke/load/failure/rollback results;
- approver and approval timestamp;
- known exceptions.
