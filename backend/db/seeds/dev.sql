-- -- For safety and idempotency, wrap the entire script in a transaction.
-- -- This ensures that if any part fails, the whole operation is rolled back.
-- BEGIN;

-- -- To make the script runnable multiple times, we'll clear out existing data.
-- -- The 'CASCADE' option will follow foreign key relationships and clear dependent data.
-- TRUNCATE TABLE
--   accounts,
--   exercises,
--   plans,
--   exercise_groups,
--   exercise_group_exercises,
--   exercise_logs
-- RESTART IDENTITY CASCADE;

-- -- Declare variables to hold the generated UUIDs. This makes the script easier to read.
-- DO $$
-- DECLARE
--   account_id_1 uuid;
--   account_id_2 uuid;
--   exercise_id_bench uuid;
--   exercise_id_squat uuid;
--   exercise_id_plank uuid;
--   exercise_id_pullups uuid;
--   exercise_id_running uuid;
--   plan_id_strength uuid;
--   group_id_upper_body uuid;
--   group_id_lower_body uuid;
-- BEGIN
--   -- Seeding the 'accounts' table with individual inserts
--   INSERT INTO accounts (email) VALUES
--   ('john.doe@example.com')
--   RETURNING id INTO account_id_1;

--   INSERT INTO accounts (email) VALUES
--   ('jane.smith@example.com')
--   RETURNING id INTO account_id_2;

--   -- Seeding the 'exercises' table with individual inserts
--   -- NOTE: Assumes 'exercise_tracking_type' has these values.
--   -- Change these strings if your type definition is different.
--   INSERT INTO exercises (name, description, tracking_type) VALUES
--   ('Bench Press', 'Lay on a bench and press a barbell upwards from your chest.', 'reps_sets_weight')
--   RETURNING id INTO exercise_id_bench;

--   INSERT INTO exercises (name, description, tracking_type) VALUES
--   ('Squat', 'Lower your hips from a standing position and then stand back up.', 'reps_sets_weight')
--   RETURNING id INTO exercise_id_squat;

--   INSERT INTO exercises (name, description, tracking_type) VALUES
--   ('Plank', 'Hold a push-up position, resting on your forearms.', 'time_based')
--   RETURNING id INTO exercise_id_plank;

--   INSERT INTO exercises (name, description, tracking_type) VALUES
--   ('Pull-ups', 'Pull your body up with your arms on an overhead bar.', 'reps_sets_weight')
--   RETURNING id INTO exercise_id_pullups;

--   INSERT INTO exercises (name, description, tracking_type) VALUES
--   ('Treadmill Running', 'Run on a treadmill at a consistent pace.', 'time_based')
--   RETURNING id INTO exercise_id_running;

--   -- Seeding the 'plans' table
--   -- Create a plan for John Doe.
--   INSERT INTO plans (account_id, name)
--   SELECT account_id_1, 'Strength Training - 3 Day Split'
--   RETURNING id INTO plan_id_strength;

--   -- Seeding the 'exercise_groups' table
--   -- NOTE: Assumes this table has 'plan_id' and 'name' columns.
--   -- Create two workout days for the strength plan.
--   INSERT INTO exercise_groups (plan_id, name, day_of_week) VALUES
--   (plan_id_strength, 'Day 1: Upper Body Focus', 1)
--   RETURNING id INTO group_id_upper_body;

--   INSERT INTO exercise_groups (plan_id, name, day_of_week) VALUES
--   (plan_id_strength, 'Day 2: Lower Body Focus', 1)
--   RETURNING id INTO group_id_lower_body;

--   -- Seeding the 'exercise_group_exercises' join table
--   -- Link exercises to the newly created exercise groups.
--   INSERT INTO exercise_group_exercises (exercise_group_id, exercise_id) VALUES
--   (group_id_upper_body, exercise_id_bench),
--   (group_id_upper_body, exercise_id_pullups),
--   (group_id_lower_body, exercise_id_squat);

--   -- Seeding the 'exercise_logs' table
--   -- Log a few completed workouts for John Doe.
--   -- The 'metrics' column is JSONB, so we insert valid JSON.
--   -- Notice the different JSON structures based on the exercise type.
--   INSERT INTO exercise_logs (account_id, exercise_id, metrics, created_at) VALUES
--   (account_id_1, exercise_id_bench, '{"sets": [{"reps": 10, "weight_kg": 60}, {"reps": 8, "weight_kg": 65}]}', '2025-09-01 10:00:00'),
--   (account_id_1, exercise_id_pullups, '{"sets": [{"reps": 8}, {"reps": 6}, {"reps": 5}]}', '2025-09-01 10:15:00'),
--   (account_id_1, exercise_id_squat, '{"sets": [{"reps": 12, "weight_kg": 80}, {"reps": 10, "weight_kg": 85}]}', '2025-09-03 10:05:00'),
--   (account_id_1, exercise_id_running, '{"duration_minutes": 20, "distance_km": 3.5}', '2025-09-05 08:00:00');

--   -- Log a workout for Jane Smith (who doesn't have a plan yet).
--   INSERT INTO exercise_logs (account_id, exercise_id, metrics, created_at) VALUES
--   (account_id_2, exercise_id_plank, '{"duration_seconds": 90}', '2025-09-04 18:30:00');

-- END $$;

-- COMMIT;

