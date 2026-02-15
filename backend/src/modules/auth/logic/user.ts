import {findUserById} from "../repo/user.repo.ts";

export class UserNotFound extends Error {}

export async function getUser(userId: string) {
  const user = await findUserById(userId)
  if (!user) throw new UserNotFound('Could not find user')

  return {
    id: user.id,
    username: user.username,
    email: user.email
  }
}
