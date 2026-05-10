import { db } from "../../../lib/db/client.ts";
import { addBodyweightRaw } from "./queries/add-bodyweight.ts";
import { getBodyweightListRaw } from "./queries/get-bodyweight-list.ts";
export async function addBodyweightRepo({ userId, weight }) {
    const rows = await addBodyweightRaw.run({
        user_id: userId,
        weight
    }, db);
    return rows[0];
}
export async function getBodyweightListRepo({ userId }) {
    const rows = await getBodyweightListRaw.run({
        user_id: userId
    }, db);
    return rows;
}
