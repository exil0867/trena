/** Types generated for queries found in "src/modules/auth/repo/queries/find-user-by-email.sql" */
import { PreparedQuery } from '@pgtyped/runtime';
const findUserByEmailRawIR = { "usedParamSet": { "email": true }, "params": [{ "name": "email", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 67, "b": 72 }] }], "statement": "SELECT id, email, username, password_hash FROM users WHERE email = :email" };
/**
 * Query generated from SQL:
 * ```
 * SELECT id, email, username, password_hash FROM users WHERE email = :email
 * ```
 */
export const findUserByEmailRaw = new PreparedQuery(findUserByEmailRawIR);
