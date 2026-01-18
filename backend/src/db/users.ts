import { db } from "./client.js";


export async function createUser({email, passwordHash}: {email: string, passwordHash: string}) {
  await db.query(`INSERT INTO users (email, password_hash) VALUES ($1, $2)`, [email, passwordHash])
}

export async function findUserByEmail(email: string) {
  const res = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
  return res.rows[0] ?? null
}

export async function findUserById(id: string) {
  const res = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
  return res.rows[0] ?? null
}
