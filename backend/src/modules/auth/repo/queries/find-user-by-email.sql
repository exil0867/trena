/* @name FindUserByEmailRaw */
SELECT id, email, username, password_hash FROM users WHERE email = :email;
