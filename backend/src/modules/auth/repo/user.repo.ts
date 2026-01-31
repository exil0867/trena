import {db} from "../../../lib/db/client.js";


export async function createUser({email, username, passwordHash}: {email: string, username: string, passwordHash: string}) {
  await db.query(`INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3)`, [email, username, passwordHash])
}

export async function findUserByEmail(email: string) {
  const res = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
  return res.rows[0] ?? null
}

export async function findUserByUsername(username: string) {
  const res = await db.query(`SELECT * FROM users WHERE username = $1`, [username])
  return res.rows[0] ?? null
}

export async function findUserById(id: string) {
  const res = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
  return res.rows[0] ?? null
}
