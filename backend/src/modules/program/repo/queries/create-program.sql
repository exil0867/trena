/* @name CreateProgramRaw */
INSERT INTO programs (user_id, title) VALUES (:user_id, :title) RETURNING id;
