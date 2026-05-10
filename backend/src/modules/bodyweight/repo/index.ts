
import {db} from "../../../lib/db/client.js";
import {addBodyweightRaw} from "./queries/add-bodyweight.js";
import { getBodyweightListRaw } from "./queries/get-bodyweight-list.js";

export async function addBodyweightRepo({userId, weight}: {userId: string, weight: number}) {
  const rows = await addBodyweightRaw.run({
    user_id: userId,
    weight
  }, db)
  return rows[0]
}

export async function getBodyweightListRepo({userId}: {userId: string}) {
  const rows = await getBodyweightListRaw.run({
    user_id: userId
  }, db)
  return rows
}
