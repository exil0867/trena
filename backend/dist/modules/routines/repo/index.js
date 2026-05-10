import { createRoutineRaw } from "./queries/create-routine.ts";
import { db } from "../../../lib/db/client.ts";
export async function createRoutine({ userId, programId, title }) {
    const rows = await createRoutineRaw.run({ user_id: userId, program_id: programId, title: title }, db);
    return rows[0];
}
