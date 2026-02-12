import {db} from "../../../lib/db/client.js";

import { createUserRaw } from "./queries/create-user.ts";
import {findUserByEmailRaw} from "./queries/find-user-by-email.ts";
import {findUserByUsernameRaw} from "./queries/find-user-by-username.ts";
import {findUserByIdRaw} from "./queries/find-user-by-id.ts";

export async function createUser({email, username, passwordHash}: {email: string, username: string, passwordHash: string}) {
  const rows = await createUserRaw.run({email, username, passwordHash}, db);
  const row = rows[0]
  if (!row) {
    throw new Error('CreateUser returned no rows.')
  }
  return row.id
}

export async function findUserByEmail(email: string) {
  const rows = await findUserByEmailRaw.run({email}, db)
  const row = rows[0]
  if (!row) {
    throw new Error('FindUserByEmail returned no rows.');
  }
  return row
}

export async function findUserByUsername(username: string) {
  const rows = await findUserByUsernameRaw.run({username}, db)
  const row = rows[0]
  if (!row) {
    throw new Error('FindUserByUsername returned no rows.');
  }
  return row
}

export async function findUserById(id: string) {
  const rows = await findUserByIdRaw.run({id}, db)
  const row = rows[0]
  if (!row) {
    throw new Error('FindUserById returned no rows.');
  }
  return row
}
