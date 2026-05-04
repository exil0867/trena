/* @name GetBodyweightListRaw */

SELECT id, user_id, weight, created_at FROM bodyweight WHERE user_id = :user_id;
