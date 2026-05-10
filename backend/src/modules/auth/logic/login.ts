import { findUserByEmail} from "../repo/user.repo.js";
import { verifyPassword} from "../impl/password.js";
import {signToken} from "../impl/jwt.js";

export class InvalidLoginCredentials extends Error {}

export async function login({email, password}: {email: string, password: string}) {
  const user = await findUserByEmail(email)
  if (!user) throw new InvalidLoginCredentials("Email does not exist")

  const validPassword = await verifyPassword(password, user.password_hash)
  if (!validPassword) throw new InvalidLoginCredentials('Invalid password')

  return signToken({sub: user.id})
}
