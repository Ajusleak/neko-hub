# NEIKOS Rollback Runbook

**Status:** Draft / Review Required

## Trigger conditions

Rollback is required for critical authorization regressions, persistent 5xx/error-rate breach, failed critical readiness, data-integrity risk, incompatible provider behavior, unrecoverable event backlog, or security incident requiring removal of the release.

## Procedure

1. Freeze further rollout and record the active deployment ID.
2. Route traffic to the last approved healthy artifact or disable the affected feature through an approved control.
3. Never roll back data blindly. Use the datastore-specific migration/restore procedure approved for the concrete persistence adapter.
4. Verify `/health/live` and `/health/ready` on the restored version.
5. Verify identity/authorization, read paths, mutation paths, events, notifications, analytics/audit, and provider adapters.
6. Confirm error rates and critical observability signals return to the accepted range.
7. Preserve logs, traces, audit events, deployment metadata, and failure evidence.
8. Open a corrective change; do not silently patch the production baseline.

## Rollback drill pass condition

A drill passes only when the prior release can be restored using documented procedures, critical readiness returns healthy, user-critical smoke flows pass, and no unresolved data-integrity issue remains.
