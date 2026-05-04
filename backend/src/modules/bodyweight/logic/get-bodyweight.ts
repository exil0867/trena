import { getUser } from "../../auth/logic/user";
import { getBodyweightListRepo } from "../repo";

export async function getBodyweightList({userId}: {userId: string}) {
  const user = await getUser(userId)
  const list = await getBodyweightListRepo({
    userId: user.id
  })

  if (!list) {
    throw new Error(`getBodyweightList returned no rows.`)
  }

  return list
}
