# API Architecture

NEIKOS HUB is API-first. Web, Android, Discord, agents, and administration consume the same versioned `/api/v1` contract. The UI imports only `lib/api/client.ts`; adapters provide mock or production transport without changing consumers.

Services own Identity, Users, Fortnite Data, Locker, Search, Notifications, AI, Assets, Analytics, and Admin domains.
