/** Types generated for queries found in "src/modules/program/repo/queries/create-program.sql" */
import { PreparedQuery } from '@pgtyped/runtime';
const createProgramRawIR = { "usedParamSet": { "user_id": true, "title": true }, "params": [{ "name": "user_id", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 46, "b": 53 }] }, { "name": "title", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 56, "b": 61 }] }], "statement": "INSERT INTO programs (user_id, title) VALUES (:user_id, :title) RETURNING id" };
/**
 * Query generated from SQL:
 * ```
 * INSERT INTO programs (user_id, title) VALUES (:user_id, :title) RETURNING id
 * ```
 */
export const createProgramRaw = new PreparedQuery(createProgramRawIR);
