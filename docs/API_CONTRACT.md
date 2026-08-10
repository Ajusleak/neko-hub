# API Contract

All endpoints use `/api/v1`, JSON, a request ID, explicit authentication and authorization, Zod-compatible schemas, cursor/page pagination, documented caching, and predictable envelopes.

Success: `{ success: true, data, meta: { requestId, timestamp, service } }`.

Errors: `{ success: false, error: { code, message, details }, meta: { requestId } }`.

Collection metadata adds `page`, `pageSize`, and `total`.
