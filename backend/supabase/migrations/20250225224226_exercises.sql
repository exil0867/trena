
CREATE TYPE exercise_tracking_type AS ENUM ('reps_sets_weight', 'time_based', 'distance_based', 'calories');

CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    tracking_type exercise_tracking_type NOT NULL
);

CREATE TABLE routine_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    UNIQUE (routine_id, exercise_id)
);
