import { Hono } from "hono";

import { signupSchema } from '../../../../../shared/auth/signup.schema.ts'
import { loginSchema } from '../../../../../shared/auth/login.schema.js'
import {InvalidSignupCredentials, signup} from "../logic/signup.ts";
import {InvalidLoginCredentials, login} from "../logic/login.ts";


export const authRoutes = new Hono()

authRoutes.post('/signup', async(c) => {
  const obj = await c.req.json()
  const parsed = signupSchema.safeParse(obj)
  if (!parsed.success) return c.json({error: `The request is malformed`}, 400)
  try {
    const userId = signup(parsed.data)
    return c.json({ userId })
  } catch (err) {
    if (err instanceof InvalidSignupCredentials) {
      return c.json({error: 'Invalid credentials'}, 401)
    }
  }
})

authRoutes.post(`/login`, async(c) => {
  const obj = await c.req.json()
  const parsed = loginSchema.safeParse(obj)
  if (!parsed.success) return c.json({error: `The request is malformed`}, 400)

  try {
    const token = login(parsed.data)
    return c.json({ accessToken: token }, 201)
  } catch (err) {
    if (err instanceof InvalidLoginCredentials) {
      return c.json({ error: 'Invalid credentials'}, 401)
    }
  }


})
