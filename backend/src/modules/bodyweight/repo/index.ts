
import {db} from "../../../lib/db/client.ts";
import {addBodyweightRaw} from "./queries/add-bodyweight.ts";

export async function addBodyweightRepo({userId, weight}: {userId: string, weight: number}) {
  const rows = await addBodyweightRaw.run({
    user_id: userId,
    weight
  }, db)
  return rows[0]
}
