import { getUser } from "../../auth/logic/user.js";
import { getBodyweightListRepo } from "../repo/index.js";
export async function getBodyweightList({ userId }) {
    const user = await getUser(userId);
    const list = await getBodyweightListRepo({
        userId: user.id
    });
    if (!list) {
        throw new Error(`getBodyweightList returned no rows.`);
    }
    return list;
}
