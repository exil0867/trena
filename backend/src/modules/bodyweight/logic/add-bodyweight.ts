import {addBodyweightRepo} from "../repo";
import {getUser} from "../../auth/logic/user.ts";

export async function addBodyweight({userId, weight}: {userId: string, weight: number}) {
  const user = await getUser(userId)
  const bodyweight = await addBodyweightRepo({
    userId: user.id,
    weight
  })
  if (!bodyweight) {
    throw new Error('addBodyweight returned no rows')
  }
  return bodyweight
}
