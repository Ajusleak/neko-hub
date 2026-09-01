# P3-I4 — Identity and Security Boundary

**Status:** Implemented / Self-Validated / Awaiting Security Review  
**Date:** 2026-08-14

## Implemented now

- provider-neutral `AuthContext` contract;
- injected identity resolver boundary;
- authentication normalization;
- scope authorization (`all` or `any` semantics);
- role authorization;
- explicit `unauthorized` vs `forbidden` failure distinction;
- sensitive HTTP-header redaction;
- recursive common-secret redaction for observability payloads.

## Explicitly not invented

P3-I4 does not create or claim an identity provider, OAuth/OIDC tenant, password database, cryptographic signing key, token format, session store, MFA mechanism, cookie policy, secrets manager, or production key-rotation scheme. Those are deployment/security architecture decisions and require an approved provider/runtime specification.

## Security rules

1. Raw authorization material must not be emitted to logs or analytics.
2. Services consume normalized `AuthContext`, not provider-specific token internals.
3. Authorization is deny-by-default when required scopes/roles are absent.
4. Anonymous context cannot satisfy authenticated scope/role checks.
5. Provider adapters must validate credentials before constructing authenticated context.
6. Authentication and authorization failures use the common API error envelope.

## Review requirement

Identity/security is security-sensitive under NEOS and remains awaiting security review before baseline eligibility.
