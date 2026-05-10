/** Types generated for queries found in "src/modules/auth/repo/queries/find-user-by-id.sql" */
import { PreparedQuery } from '@pgtyped/runtime';
const findUserByIdRawIR = { "usedParamSet": { "id": true }, "params": [{ "name": "id", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 64, "b": 66 }] }], "statement": "SELECT id, email, username, password_hash FROM users WHERE id = :id" };
/**
 * Query generated from SQL:
 * ```
 * SELECT id, email, username, password_hash FROM users WHERE id = :id
 * ```
 */
export const findUserByIdRaw = new PreparedQuery(findUserByIdRawIR);
