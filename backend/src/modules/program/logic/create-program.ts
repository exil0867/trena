import {createProgram as createProgramRepo} from "../repo";
import {getUser} from "../../auth/logic/user.ts";

export async function createProgram({userId, title}: {userId: string, title:string, description?: string}) {
  const user = await getUser(userId)
  const program = await createProgramRepo({
    userId: user.id,
    title,
  })

  if (!program) {
    throw new Error('CreateUser returned no rows.')
  }
  return program.id
}
