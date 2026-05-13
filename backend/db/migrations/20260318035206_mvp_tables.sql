-- Migration: mvp_tables
-- Created at: 20260318035206

BEGIN;


create table users (
   id uuid primary key default gen_random_uuid(),
   email text unique not null,
   username varchar(32) unique not null,
   password_hash text not null,
   created_at timestamp with time zone not null default now()
);

create table bodyweight (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  weight real not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table programs (
   id uuid primary key default gen_random_uuid(),
   user_id uuid references users(id) on delete cascade,
   title text not null,
   created_at timestamp with time zone not null default now(),
   updated_at timestamp with time zone not null default now()
);

create table routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  program_id uuid references programs(id) on delete set null,
  title text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table exercises (
   id uuid primary key default gen_random_uuid(),
   title text not null,
   description text,
   created_at timestamp with time zone not null default now(),
   updated_at timestamp with time zone not null default now()
);

create table routines_exercises (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references exercises(id),
  routine_id uuid not null references routines(id) on delete cascade,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  routine_id uuid references routines(id) on delete set null,
  user_id uuid references users(id) on delete cascade,
  completed boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table workout_sets (
   id uuid primary key default gen_random_uuid(),
   exercise_id uuid not null references exercises(id),
   session_id uuid not null references sessions(id),
   reps integer,
   weight real not null,
   created_at timestamp with time zone not null default now(),
   updated_at timestamp with time zone not null default now()
);

COMMIT;
