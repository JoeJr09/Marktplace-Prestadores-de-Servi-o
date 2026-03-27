CREATE SCHEMA IF NOT EXISTS acode_aqui;
SET search_path TO acode_aqui;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role' AND typnamespace = 'acode_aqui'::regnamespace) THEN
    CREATE TYPE user_role AS ENUM ('guest', 'customer', 'provider', 'admin');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_account_status' AND typnamespace = 'acode_aqui'::regnamespace) THEN
    CREATE TYPE user_account_status AS ENUM ('pending', 'active', 'inactive', 'suspended');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(320) NOT NULL,
  email_normalized VARCHAR(320) NOT NULL,
  username VARCHAR(50),
  username_normalized VARCHAR(50),
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(24),
  company_name VARCHAR(120),
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  status user_account_status NOT NULL DEFAULT 'pending',
  is_seeded BOOLEAN NOT NULL DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by_user_id UUID REFERENCES users(id),
  updated_by_user_id UUID REFERENCES users(id),
  CONSTRAINT users_email_normalized_lowercase CHECK (email_normalized = lower(email_normalized)),
  CONSTRAINT users_username_normalized_lowercase CHECK (
    username_normalized IS NULL OR username_normalized = lower(username_normalized)
  ),
  CONSTRAINT users_full_name_not_blank CHECK (length(trim(full_name)) > 0),
  CONSTRAINT users_password_hash_not_blank CHECK (length(trim(password_hash)) > 0),
  CONSTRAINT users_username_pairing CHECK (
    (username IS NULL AND username_normalized IS NULL) OR
    (username IS NOT NULL AND username_normalized IS NOT NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_normalized_unique_idx ON users (email_normalized);
CREATE UNIQUE INDEX IF NOT EXISTS users_username_normalized_unique_idx
  ON users (username_normalized)
  WHERE username_normalized IS NOT NULL;
CREATE INDEX IF NOT EXISTS users_role_status_idx ON users (role, status);
CREATE INDEX IF NOT EXISTS users_created_at_idx ON users (created_at DESC);

CREATE OR REPLACE FUNCTION set_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_set_updated_at ON users;

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_users_updated_at();

CREATE TABLE IF NOT EXISTS auth_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  CONSTRAINT auth_sessions_token_hash_not_blank CHECK (length(trim(token_hash)) > 0)
);

CREATE UNIQUE INDEX IF NOT EXISTS auth_sessions_token_hash_unique_idx ON auth_sessions (token_hash);
CREATE INDEX IF NOT EXISTS auth_sessions_user_id_idx ON auth_sessions (user_id, expires_at DESC);
CREATE INDEX IF NOT EXISTS auth_sessions_active_idx ON auth_sessions (expires_at) WHERE revoked_at IS NULL;
