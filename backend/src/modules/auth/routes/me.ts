import { Hono } from "hono";
import { authMiddleware } from "../../../middleware/auth.js";
import {findUserById} from "../repo/user.repo.js";
import {meSchema} from "../../../../../shared/auth/me.schema.ts";

export const meRoutes = new Hono< { Variables: { userId: string }}>()

meRoutes.get('/me', authMiddleware, async (c) => {
  const userId = c.get('userId')
  const user = await findUserById(userId)
  if (!user) return c.json({error: 'not found'}, 401)

  return c.json({ id: user.id, email: user.email, username: user.username })
})
