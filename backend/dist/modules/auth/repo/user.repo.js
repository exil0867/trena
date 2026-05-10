import { db } from "../../../lib/db/client.js";
import { createUserRaw } from "./queries/create-user.ts";
import { findUserByEmailRaw } from "./queries/find-user-by-email.ts";
import { findUserByUsernameRaw } from "./queries/find-user-by-username.ts";
import { findUserByIdRaw } from "./queries/find-user-by-id.ts";
export async function createUser({ email, username, passwordHash }) {
    const rows = await createUserRaw.run({ email, username, passwordHash }, db);
    return rows[0];
}
export async function findUserByEmail(email) {
    const rows = await findUserByEmailRaw.run({ email }, db);
    return rows[0];
}
export async function findUserByUsername(username) {
    const rows = await findUserByUsernameRaw.run({ username }, db);
    return rows[0];
}
export async function findUserById(id) {
    const rows = await findUserByIdRaw.run({ id }, db);
    return rows[0];
}
