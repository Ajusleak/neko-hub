# Error Model

The central client maps 401 session expiry, 403 permission denial, 404 missing resources, 409 conflicts, 422 validation, 429 rate limits, and 5xx availability errors into safe user-facing states. Stack traces and infrastructure details are never returned.
