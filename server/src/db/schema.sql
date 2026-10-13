-- Gentech AI Tools — Database Schema
-- Phase 2: Users, sessions, profiles
-- Run against a PostgreSQL 15+ database.

-- ─── Extensions ───
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users ───
-- One row per sign-up. Google OAuth populates google_id on first login.
CREATE TABLE IF NOT EXISTS users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  name       TEXT,
  avatar_url TEXT,
  google_id  TEXT UNIQUE,
  plan       TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Sessions ───
-- Each row is a refresh-token grant. Deleting a row logs the user out of that device.
CREATE TABLE IF NOT EXISTS sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token TEXT UNIQUE NOT NULL,
  user_agent    TEXT,
  ip_address    TEXT,
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id       ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_refresh_token ON sessions(refresh_token);

-- ─── Profiles ───
-- Extended user info. Separated so the users table stays lean.
CREATE TABLE IF NOT EXISTS profiles (
  user_id    UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  role_tags  TEXT[] DEFAULT '{}',
  bio        TEXT,
  timezone   TEXT DEFAULT 'Asia/Manila',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Auto-update updated_at ───
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
