# P3-I3 — Shared SDK Bootstrap

**Status:** Implemented / Self-Validated / Awaiting Review  
**Date:** 2026-08-14

`@neikos/api-client` provides a dependency-free fetch transport for the common NEIKOS API envelope.

Implemented behavior:

- configurable base URL;
- request ID generation/propagation;
- optional bearer token provider;
- JSON request/response handling;
- configurable timeout/abort;
- API-envelope validation;
- typed client error carrying HTTP status, API code, request ID, and retryability.

This SDK deliberately does not contain domain-specific endpoints yet. Domain endpoint clients should be generated or added only after their service contracts are defined.
