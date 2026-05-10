/** Types generated for queries found in "src/modules/routines/repo/queries/create-routine.sql" */
import { PreparedQuery } from '@pgtyped/runtime';
const createRoutineRawIR = { "usedParamSet": { "user_id": true, "program_id": true, "title": true }, "params": [{ "name": "user_id", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 57, "b": 64 }] }, { "name": "program_id", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 67, "b": 77 }] }, { "name": "title", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 80, "b": 85 }] }], "statement": "INSERT INTO routines(user_id, program_id, title) VALUES (:user_id, :program_id, :title) RETURNING id" };
/**
 * Query generated from SQL:
 * ```
 * INSERT INTO routines(user_id, program_id, title) VALUES (:user_id, :program_id, :title) RETURNING id
 * ```
 */
export const createRoutineRaw = new PreparedQuery(createRoutineRawIR);
