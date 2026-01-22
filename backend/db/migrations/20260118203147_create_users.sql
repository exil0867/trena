-- Migration: create_users
-- Created at: 20260118203147

BEGIN;

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  username varchar(32) unique not null,
  password_hash text not null,
  created_at timestamp with time zone not null default now()
);

COMMIT;
