import { getUser } from "../../auth/logic/user";
import { createSessionRepo } from "../repo";

export async function createSession({userId, routineId}: {userId: string, routineId: string}) {
  const user = await getUser(userId)
  const session = await createSessionRepo({userId: user.id, routineId})

  if (!session) {
    throw new Error('No rows were returned')
  }

  return session
}
