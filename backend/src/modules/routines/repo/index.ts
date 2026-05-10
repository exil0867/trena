import {createRoutineRaw} from "./queries/create-routine.js";
import {db} from "../../../lib/db/client.js";

export async function createRoutine({userId, programId, title}: {userId: string, programId: string, title: string}) {
  const rows = await createRoutineRaw.run({user_id: userId, program_id: programId, title: title}, db)
   return rows[0]
}
