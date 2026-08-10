# Rate Limiting

Identity, search, AI, public, authenticated, and admin traffic use separate policies. Responses include `Retry-After` where possible. The client treats 429 as a recoverable state and communicates when retry is safe.
