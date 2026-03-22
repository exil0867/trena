/* @name CreateRoutineRaw */

INSERT INTO routines(user_id, program_id, title) VALUES (:user_id, :program_id, :title) RETURNING id;
