import {addBodyweightRepo} from "../repo/index.js";
import {getUser} from "../../auth/logic/user.js";

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
