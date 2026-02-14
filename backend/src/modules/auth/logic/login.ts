import { findUserByEmail} from "../repo/user.repo.ts";
import { verifyPassword} from "../impl/password.ts";
import {signToken} from "../impl/jwt.ts";

export class InvalidCredentials extends Error {}

export async function login({email, password}: {email: string, password: string}) {
  const user = await findUserByEmail(email)

  const validPassword = await verifyPassword(password, user.password_hash)
  if (!validPassword) throw new InvalidCredentials('Invalid password')

  return signToken({sub: user.id})
}
