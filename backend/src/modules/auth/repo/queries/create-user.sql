/* @name CreateUserRaw */
INSERT INTO users (email, username, password_hash) VALUES (:email, :username, :passwordHash) RETURNING id;
