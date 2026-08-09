-- Migration: optional_workout_session
-- Created at: 20260515203511

BEGIN;

  alter table workout_sets alter column session_id drop not null;

COMMIT;
