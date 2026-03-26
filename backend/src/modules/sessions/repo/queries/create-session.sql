/* @name CreateSessionRaw */

INSERT INTO sessions(user_id, routine_id) VALUES (:user_id, :routine_id) RETURNING id;
