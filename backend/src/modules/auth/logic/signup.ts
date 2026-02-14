import {createUser, findUserByEmail} from "../repo/user.repo.ts";
import {hashPassword} from "../impl/password.ts";


export class InvalidCredentials extends Error {}

export async function signup({email, username, password}: {email: string, username: string, password: string}) {
  const user = await findUserByEmail(email)
  if (user) throw new InvalidCredentials('Email already exists')
  const passwordHash = await hashPassword(password)
  return  await createUser({
    email,
    username,
    passwordHash
  })
}
