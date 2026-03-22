import {getUser} from "../../auth/logic/user.ts";
import {createRoutine as createRoutineRepo} from '../repo/index.ts'

export async function createRoutine({userId, programId, title}: {userId: string, programId: string, title: string}) {
  const user = await getUser(userId)
  const routine = await createRoutineRepo({userId: user.id, programId, title})

  if (!routine) {
    throw new Error('createRoutine returned no rows')
  }
  return routine
}
