/* @name AddBodyweightRaw */
INSERT INTO bodyweight(user_id, weight) VALUES (:user_id, :weight) RETURNING id;
