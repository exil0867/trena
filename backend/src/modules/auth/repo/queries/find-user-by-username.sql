/* @name FindUserByUsernameRaw */
SELECT id, email, username, password_hash FROM users WHERE username = :username;
