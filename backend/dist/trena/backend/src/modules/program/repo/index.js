import { createProgramRaw } from './queries/create-program.js';
import { db } from "../../../lib/db/client.js";
export async function createProgram({ userId, title }) {
    const rows = await createProgramRaw.run({ user_id: userId, title }, db);
    return rows[0];
}
