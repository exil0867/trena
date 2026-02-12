import {createUser} from "../repo/user.repo.ts";

export async function signup({email, username, passwordHash}: {email: string, username: string, passwordHash: string}) {
  await createUser({
    email,
    username,
    passwordHash
  })
}
