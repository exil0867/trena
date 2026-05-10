/** Types generated for queries found in "src/modules/auth/repo/queries/find-user-by-username.sql" */
import { PreparedQuery } from '@pgtyped/runtime';
const findUserByUsernameRawIR = { "usedParamSet": { "username": true }, "params": [{ "name": "username", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 70, "b": 78 }] }], "statement": "SELECT id, email, username, password_hash FROM users WHERE username = :username" };
/**
 * Query generated from SQL:
 * ```
 * SELECT id, email, username, password_hash FROM users WHERE username = :username
 * ```
 */
export const findUserByUsernameRaw = new PreparedQuery(findUserByUsernameRawIR);
