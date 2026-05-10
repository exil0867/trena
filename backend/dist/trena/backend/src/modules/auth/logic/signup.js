import { createUser, findUserByEmail } from "../repo/user.repo.js";
import { hashPassword } from "../impl/password.js";
export class InvalidSignupCredentials extends Error {
}
export async function signup({ email, username, password }) {
    const user = await findUserByEmail(email);
    if (user)
        throw new InvalidSignupCredentials('Email already exists');
    const passwordHash = await hashPassword(password);
    const row = await createUser({
        email,
        username,
        passwordHash
    });
    if (!row) {
        throw new Error('CreateUser returned no rows.');
    }
    return row.id;
}
