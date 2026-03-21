import { createProgramRaw } from './queries/create-program.ts'
import {db} from "../../../lib/db/client.ts";

export async function createProgram({userId, title}: {userId: string, title: string}) {
  const rows = await createProgramRaw.run({user_id: userId, title}, db)
  return rows[0]
}
