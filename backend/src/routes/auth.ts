import { Hono } from "hono";
import { hashPassword, verifyPassword } from "../auth/password.js";
import { createUser, findUserByEmail } from "../db/users.js";
import { signToken } from "../auth/jwt.js";
import { signupSchema } from '../../../shared/schema/signup.schema.js'
import { loginSchema } from '../../../shared/schema/login.schema.js'


export const authRoutes = new Hono()

authRoutes.post('/signup', async(c) => {
  const obj = await c.req.json()
  const parsed = signupSchema.safeParse(obj)
  if (!parsed.success) return c.json({error: `The request is malformed`}, 400)
  const { email, username, password } = parsed.data
  const passwordHash = await hashPassword(password)

  await createUser({
    email,
    username,
    passwordHash
  })
  return c.json({ ok:true })
})

authRoutes.post(`/login`, async(c) => {
  const obj = await c.req.json()
  const parsed = loginSchema.safeParse(obj)
  if (!parsed.success) return c.json({error: `The request is malformed`}, 400)

  const { email, password } = parsed.data

  const user = await findUserByEmail(email)
  if (!user) return c.json({error: `Invalid credentials`}, 401)

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) return c.json({error: `Invalid credentials`}, 401)

  const token = signToken({sub: user.id})

  return c.json({ accessToken: token })
})
