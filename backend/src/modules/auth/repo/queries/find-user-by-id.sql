/* @name FindUserByIdRaw */
SELECT id, email, username, password_hash FROM users WHERE id = :id;
