BEGIN;

-- =====================
-- COMPOUND BARBELL
-- =====================
INSERT INTO exercises (name, description, tracking_type) VALUES
('Back Squat', 'Barbell squat with bar on upper back', 'reps_sets_weight'),
('Front Squat', 'Barbell squat with bar in front rack position', 'reps_sets_weight'),
('Overhead Squat', 'Squat with barbell held overhead', 'reps_sets_weight'),
('Deadlift', 'Conventional barbell deadlift from floor', 'reps_sets_weight'),
('Sumo Deadlift', 'Wide-stance deadlift', 'reps_sets_weight'),
('Romanian Deadlift', 'Hip hinge with minimal knee bend', 'reps_sets_weight'),
('Bench Press', 'Flat barbell bench press', 'reps_sets_weight'),
('Incline Bench Press', 'Incline barbell bench press', 'reps_sets_weight'),
('Overhead Press', 'Standing barbell shoulder press', 'reps_sets_weight'),
('Push Press', 'Overhead press with leg drive', 'reps_sets_weight'),
('Power Clean', 'Explosive barbell clean', 'reps_sets_weight'),
('Clean and Jerk', 'Olympic clean followed by jerk', 'reps_sets_weight'),
('Snatch', 'Olympic snatch lift', 'reps_sets_weight');

-- =====================
-- DUMBBELL
-- =====================
INSERT INTO exercises (name, description, tracking_type) VALUES
('Dumbbell Bench Press', 'Flat dumbbell bench press', 'reps_sets_weight'),
('Incline Dumbbell Bench Press', 'Incline dumbbell bench press', 'reps_sets_weight'),
('Dumbbell Shoulder Press', 'Seated or standing dumbbell press', 'reps_sets_weight'),
('Dumbbell Row', 'One-arm dumbbell row', 'reps_sets_weight'),
('Dumbbell Lateral Raise', 'Shoulder lateral raise', 'reps_sets_weight'),
('Dumbbell Front Raise', 'Shoulder front raise', 'reps_sets_weight'),
('Dumbbell Fly', 'Chest fly movement', 'reps_sets_weight'),
('Dumbbell Curl', 'Standing dumbbell biceps curl', 'reps_sets_weight'),
('Hammer Curl', 'Neutral-grip dumbbell curl', 'reps_sets_weight'),
('Dumbbell Triceps Extension', 'Overhead dumbbell triceps extension', 'reps_sets_weight'),
('Goblet Squat', 'Squat holding dumbbell or kettlebell', 'reps_sets_weight');

-- =====================
-- MACHINES
-- =====================
INSERT INTO exercises (name, description, tracking_type) VALUES
('Leg Press', 'Machine leg press', 'reps_sets_weight'),
('Leg Curl', 'Hamstring curl machine', 'reps_sets_weight'),
('Leg Extension', 'Quadriceps extension machine', 'reps_sets_weight'),
('Chest Press Machine', 'Machine chest press', 'reps_sets_weight'),
('Seated Row Machine', 'Machine-based horizontal row', 'reps_sets_weight'),
('Lat Pulldown', 'Vertical pulling machine', 'reps_sets_weight'),
('Cable Row', 'Seated cable row', 'reps_sets_weight'),
('Cable Fly', 'Chest fly using cables', 'reps_sets_weight'),
('Pec Deck', 'Chest fly machine', 'reps_sets_weight'),
('Smith Machine Squat', 'Squat using Smith machine', 'reps_sets_weight');

-- =====================
-- BODYWEIGHT
-- =====================
INSERT INTO exercises (name, description, tracking_type) VALUES
('Push-Up', 'Standard floor push-up', 'reps_sets_weight'),
('Pull-Up', 'Overhand grip pull-up', 'reps_sets_weight'),
('Chin-Up', 'Underhand grip pull-up', 'reps_sets_weight'),
('Dip', 'Parallel bar dip', 'reps_sets_weight'),
('Bodyweight Squat', 'Unloaded squat', 'reps_sets_weight'),
('Lunge', 'Forward bodyweight lunge', 'reps_sets_weight'),
('Step-Up', 'Step onto elevated surface', 'reps_sets_weight'),
('Plank', 'Isometric core hold', 'time_based'),
('Hanging Leg Raise', 'Core exercise hanging from bar', 'reps_sets_weight'),
('Mountain Climbers', 'Dynamic core and conditioning', 'time_based');

-- =====================
-- KETTLEBELL
-- =====================
INSERT INTO exercises (name, description, tracking_type) VALUES
('Kettlebell Swing', 'Hip hinge kettlebell swing', 'reps_sets_weight'),
('Kettlebell Goblet Squat', 'Goblet squat with kettlebell', 'reps_sets_weight'),
('Kettlebell Clean', 'Single kettlebell clean', 'reps_sets_weight'),
('Kettlebell Press', 'Overhead kettlebell press', 'reps_sets_weight'),
('Turkish Get-Up', 'Full-body kettlebell get-up', 'reps_sets_weight');

-- =====================
-- CARRIES & STRONGMAN
-- =====================
INSERT INTO exercises (name, description, tracking_type) VALUES
('Farmer Carry', 'Loaded carry with dumbbells or implements', 'distance_based'),
('Suitcase Carry', 'Single-arm loaded carry', 'distance_based'),
('Yoke Walk', 'Heavy yoke carry', 'distance_based'),
('Sled Push', 'Weighted sled push', 'distance_based'),
('Sled Pull', 'Weighted sled pull', 'distance_based');

-- =====================
-- CARDIO
-- =====================
INSERT INTO exercises (name, description, tracking_type) VALUES
('Treadmill Run', 'Running on treadmill', 'distance_based'),
('Outdoor Run', 'Running outdoors', 'distance_based'),
('Cycling', 'Stationary or outdoor cycling', 'distance_based'),
('Rowing Machine', 'Row erg cardio', 'distance_based'),
('Elliptical', 'Elliptical cardio machine', 'calories'),
('Stair Climber', 'Stair climbing machine', 'calories'),
('Jump Rope', 'Continuous rope jumping', 'time_based');

-- =====================
-- CORE / ACCESSORY
-- =====================
INSERT INTO exercises (name, description, tracking_type) VALUES
('Crunch', 'Abdominal crunch', 'reps_sets_weight'),
('Cable Crunch', 'Weighted cable crunch', 'reps_sets_weight'),
('Russian Twist', 'Rotational core exercise', 'reps_sets_weight'),
('Back Extension', 'Lower back extension', 'reps_sets_weight'),
('Ab Wheel Rollout', 'Core rollout movement', 'reps_sets_weight');

COMMIT;
