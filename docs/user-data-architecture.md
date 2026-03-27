# User Data Architecture

## 1. Architecture proposed

- Database engine: PostgreSQL
- Local-first strategy: environment-driven configuration plus deterministic SQL schema/seed files
- Runtime modes:
  - `USER_DATA_SOURCE=mock`: current in-memory/mock repositories
  - `USER_DATA_SOURCE=database`: future PostgreSQL repositories
  - `USER_DATA_SOURCE=hybrid`: auth/identity in PostgreSQL with marketplace-heavy mocks preserved during migration
- Goal: let Backend switch persistence behind repository interfaces without changing transport contracts first

## 2. Entities and fields

### `users`

- `id`: UUID primary key
- `email`: user-facing email
- `email_normalized`: canonical lowercase lookup field
- `username`: optional public login identifier
- `username_normalized`: canonical lowercase lookup field
- `full_name`: required display name
- `password_hash`: hashed password only
- `role`: `guest | customer | provider | admin`
- `status`: `pending | active | inactive | suspended`
- `is_seeded`: marks deterministic development accounts
- `last_login_at`: optional audit timestamp
- `created_at`, `updated_at`, `deleted_at`: lifecycle timestamps
- `created_by_user_id`, `updated_by_user_id`: nullable audit references

### `auth_sessions`

- `id`: UUID primary key
- `user_id`: required foreign key to `users`
- `token_hash`: hashed session/JWT identifier
- `expires_at`: expiration control
- `revoked_at`: explicit invalidation
- `last_seen_at`: optional usage tracking
- `created_at`: creation timestamp
- `user_agent`, `ip_address`: optional security metadata

## 3. Rules and restrictions

- Primary keys: UUIDs for `users` and `auth_sessions`
- Uniqueness:
  - `users.email_normalized` unique
  - `users.username_normalized` unique when not null
  - `auth_sessions.token_hash` unique
- Nulability:
  - `username` can be null
  - `deleted_at`, `last_login_at`, `revoked_at`, `last_seen_at`, `user_agent`, `ip_address` can be null
- Integrity:
  - normalized fields must stay lowercase
  - `full_name` and `password_hash` cannot be blank
  - `username` and `username_normalized` must coexist
- Indexes:
  - `users(role, status)`
  - `users(created_at desc)`
  - `auth_sessions(user_id, expires_at desc)`
  - partial index for active sessions on `expires_at` where `revoked_at is null`

## 4. Authentication and identity architecture

- Login should resolve by `email_normalized` first and optionally by `username_normalized`
- Registration inserts into `users` with hashed password, normalized fields and default `status`
- `GET /me` should return a stable identity payload, not raw database columns
- Guest remains a first-class role for smoke flows and demos
- Fine-grained authorization should evolve later through separate permission tables, not by overloading `users`

## 5. Env strategy

- Public template: `.env.example`
- Local real values: `.env` with optional `.env.local` overrides
- Current loading order: `.env.local`, `.env`
- Minimum variables:
  - `DATABASE_HOST`
  - `DATABASE_PORT`
  - `DATABASE_NAME`
  - `DATABASE_USER`
  - `DATABASE_PASSWORD`
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `API_PORT`
  - `FRONTEND_URL`
  - `USER_DATA_SOURCE`

## 6. Seed and mock strategy

- Mock:
  - use for UI iteration, offline frontend work and fast smoke navigation
  - current marketplace-rich user cards can remain mocked while auth/account data migrates
- Seed:
  - use for integration tests, backend local development and deterministic QA
  - keep account IDs and guest identity stable across resets
- Real registration:
  - use only in `USER_DATA_SOURCE=database`
  - new records must not overwrite seeded rows

Development seed accounts:
- guest: `username@guest.com` / `password123@`
- standard user: `dev.user@acode.local` / `client123@`
- admin: `admin@acode.local` / `admin123@`

All three are stored as hashes in `server/database/seed.dev.sql`.

## 7. Backend recommendations

- Keep repository interfaces separated by concern:
  - `AuthRepository` for account lookup and session issuance
  - `UserRepository` for profile/list/update concerns
- Use `shared/contracts/user-account.ts` as the contract source for:
  - login identifier and password validation
  - registration payload
  - authenticated user response
  - admin list response
  - profile update payload
- Suggested route order:
  1. `POST /api/auth/login`
  2. `POST /api/auth/register`
  3. `GET /api/auth/me`
  4. `PATCH /api/users/me`
  5. `GET /api/users` for admin only

## 8. QA recommendations

- Use `npm run db:reset` before integration runs against database mode
- Keep guest account stable for smoke checks and route-guard validation
- Validate both execution modes:
  - `mock` for UI continuity
  - `database` for auth, seed and repository integration
- Minimum scenarios:
  - guest login succeeds
  - register customer succeeds
  - register provider succeeds
  - duplicate email is rejected
  - duplicate username is rejected
  - `me` returns seeded guest/admin identities correctly
  - admin-only list is restricted by role

## 9. Future expansion

- `user_profiles`
- `user_addresses`
- `user_settings`
- `role_permissions`
- `audit_logs`

Those should stay in separate tables unless a concrete query pattern justifies denormalization.
