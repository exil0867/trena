import { db } from "../../../lib/db/client";
import { createSessionRaw } from "./queries/create-session";
export async function createSessionRepo({ userId, routineId }) {
    const rows = await createSessionRaw.run({ user_id: userId, routine_id: routineId }, db);
    return rows[0];
}
