# P3-I12 Security Review Checklist

**Status:** Draft / Security Review Required

- [ ] Identity adapter and trust boundary are documented and approved.
- [ ] Authentication context cannot be supplied by an untrusted client without verification.
- [ ] Authorization remains deny-by-default for privileged/mutation operations.
- [ ] Admin operations require an approved privileged role and emit audit records.
- [ ] Secrets are stored outside source/config artifacts and referenced through the approved secret manager.
- [ ] Logs, traces, analytics, and error reports redact authorization headers, cookies, tokens, passwords, keys, and secrets.
- [ ] Public endpoints, CORS/origin policy, rate limiting, request-size limits, and abuse controls are reviewed for the selected runtime.
- [ ] Persistence encryption, backup, restore, retention, and access policy are reviewed for the selected adapter.
- [ ] Event/notification systems prevent unauthorized cross-user delivery and protect sensitive payloads.
- [ ] Fortnite integration uses only authorized interfaces/credentials and documents data boundaries.
- [ ] AI provider integration documents allowed data classes, retention controls, model/provider permissions, and failure handling.
- [ ] Dependency/software supply-chain policy is applied to the concrete build.
- [ ] TLS and certificate handling are enforced by the selected production ingress/runtime.
- [ ] Security event response and credential rotation procedures are available.
- [ ] Security review findings are resolved or explicitly accepted by the authorized reviewer before release.
