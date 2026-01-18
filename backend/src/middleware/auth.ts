import { error } from "console";
import type { MiddlewareHandler } from "hono";
import { verifyToken } from "../auth/jwt.js";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const auth = c.req.header('Authorization')
  if (!auth) return c.json({ error: 'unauthorized' }, 401)

  const [, token] = auth.split(' ')
  if (!token) return c.json({error: 'unauthorized'}, 401)

  try {
    const payload = verifyToken(token)
    c.set('userId', payload.sub)
    await next()
  } catch {
    return c.json({error: 'unauthorized'}, 401)
  }
}
