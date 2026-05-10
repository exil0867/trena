import { db } from "../../../lib/db/client.js"
import { createSessionRaw } from "./queries/create-session.js"

export async function createSessionRepo({userId, routineId}: {userId: string, routineId: string}) {
  const rows = await createSessionRaw.run({user_id: userId, routine_id: routineId}, db)
  return rows[0]
}
