import { Hono } from "hono";
import { authMiddleware } from "../../../middleware/auth.js";
import {getUser, UserNotFound} from "../logic/user.ts";

export const meRoutes = new Hono< { Variables: { userId: string }}>()

meRoutes.get('/me', authMiddleware, async (c) => {
  const userId = c.get('userId')
  try {
    const user = await getUser(userId)
    return c.json({ id: user.id, email: user.email, username: user.username })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return c.json({ error: 'User not found' }, 401)
    }
  }
})
