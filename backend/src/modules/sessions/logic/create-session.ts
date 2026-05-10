import { getUser } from "../../auth/logic/user.js";
import { createSessionRepo } from "../repo/index.js";

export async function createSession({userId, routineId}: {userId: string, routineId: string}) {
  const user = await getUser(userId)
  const session = await createSessionRepo({userId: user.id, routineId})

  if (!session) {
    throw new Error('No rows were returned')
  }

  return session
}
