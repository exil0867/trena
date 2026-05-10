import { getUser } from "../../auth/logic/user.js";
import { createRoutine as createRoutineRepo } from '../repo/index.js';
export async function createRoutine({ userId, programId, title }) {
    const user = await getUser(userId);
    const routine = await createRoutineRepo({ userId: user.id, programId, title });
    if (!routine) {
        throw new Error('createRoutine returned no rows');
    }
    return routine;
}
