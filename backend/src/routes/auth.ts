import { Hono } from "hono";
import { hashPassword, verifyPassword } from "../auth/password.js";
import { createUser, findUserByEmail } from "../db/users.js";
import { signToken } from "../auth/jwt.js";


export const authRoutes = new Hono()

authRoutes.post('/signup', async(c) => {
  const { email, password } = await c.req.json()
  const passwordHash = await hashPassword(password)

  await createUser({
    email,
    passwordHash
  })
  return c.json({ ok:true })
})

authRoutes.post(`/login`, async(c) => {
  const { email, password } = await c.req.json()

  const user = await findUserByEmail(email)
  if (!user) return c.json({error: `Invalid credentials`}, 401)

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) return c.json({error: `Invalid credentials`}, 401)

  const token = signToken({sub: user.id})

  return c.json({ accessToken: token })
})
