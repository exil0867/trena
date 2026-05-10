/** Types generated for queries found in "src/modules/bodyweight/repo/queries/get-bodyweight-list.sql" */
import { PreparedQuery } from '@pgtyped/runtime';
const getBodyweightListRawIR = { "usedParamSet": { "user_id": true }, "params": [{ "name": "user_id", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 71, "b": 78 }] }], "statement": "SELECT id, user_id, weight, created_at FROM bodyweight WHERE user_id = :user_id" };
/**
 * Query generated from SQL:
 * ```
 * SELECT id, user_id, weight, created_at FROM bodyweight WHERE user_id = :user_id
 * ```
 */
export const getBodyweightListRaw = new PreparedQuery(getBodyweightListRawIR);
