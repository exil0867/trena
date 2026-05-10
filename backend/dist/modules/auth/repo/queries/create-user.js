/** Types generated for queries found in "src/modules/auth/repo/queries/create-user.sql" */
import { PreparedQuery } from '@pgtyped/runtime';
const createUserRawIR = { "usedParamSet": { "email": true, "username": true, "passwordHash": true }, "params": [{ "name": "email", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 59, "b": 64 }] }, { "name": "username", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 67, "b": 75 }] }, { "name": "passwordHash", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 78, "b": 90 }] }], "statement": "INSERT INTO users (email, username, password_hash) VALUES (:email, :username, :passwordHash) RETURNING id" };
/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (email, username, password_hash) VALUES (:email, :username, :passwordHash) RETURNING id
 * ```
 */
export const createUserRaw = new PreparedQuery(createUserRawIR);
