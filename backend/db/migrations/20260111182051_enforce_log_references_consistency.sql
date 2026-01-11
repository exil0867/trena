-- Migration: enforce_log_references_consistency
-- Created at: 20260111182051

BEGIN;

-- Enforce that exercise_logs.exercise_id matches
-- routine_exercises.exercise_id when routine_exercise_id is present

CREATE OR REPLACE FUNCTION enforce_routine_exercise_match()
RETURNS trigger AS $$
DECLARE
  routine_exercise_exercise_id uuid;
BEGIN
  -- Allow logs without routine context
  IF NEW.routine_exercise_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT exercise_id
  INTO routine_exercise_exercise_id
  FROM routine_exercises
  WHERE id = NEW.routine_exercise_id;

  IF routine_exercise_exercise_id IS NULL THEN
    RAISE EXCEPTION 'Routine exercise not found';
  END IF;

  IF routine_exercise_exercise_id <> NEW.exercise_id THEN
    RAISE EXCEPTION
      'exercise_id (%) does not match routine_exercise.exercise_id (%)',
      NEW.exercise_id,
      routine_exercise_exercise_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure idempotency
DROP TRIGGER IF EXISTS exercise_log_routine_guard ON exercise_logs;

CREATE TRIGGER exercise_log_routine_guard
BEFORE INSERT OR UPDATE ON exercise_logs
FOR EACH ROW
EXECUTE FUNCTION enforce_routine_exercise_match();

COMMIT;
