/** Types generated for queries found in "src/modules/bodyweight/repo/queries/add-bodyweight.sql" */
import { PreparedQuery } from '@pgtyped/runtime';
const addBodyweightRawIR = { "usedParamSet": { "user_id": true, "weight": true }, "params": [{ "name": "user_id", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 48, "b": 55 }] }, { "name": "weight", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 58, "b": 64 }] }], "statement": "INSERT INTO bodyweight(user_id, weight) VALUES (:user_id, :weight) RETURNING id" };
/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bodyweight(user_id, weight) VALUES (:user_id, :weight) RETURNING id
 * ```
 */
export const addBodyweightRaw = new PreparedQuery(addBodyweightRawIR);
