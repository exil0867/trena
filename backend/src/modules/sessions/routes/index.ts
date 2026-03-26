import { Hono } from "hono";
import { authMiddleware } from "../../../middleware/auth";
import {CreateSession as createSessionType} from '../../../../../shared/sessions/index.schema.ts'
import { UserNotFound } from "../../auth/logic/user";
import { createSession } from "../logic/create-session.ts";

export const sessionRoutes = new Hono<{Variables: {userId: string}}>()

sessionRoutes.post('/', authMiddleware, async(c) => {
    const userId = c.get('userId')
    const obj = await c.req.json()
    const parsed = createSessionType.safeParse(obj)

    if(!parsed.success) return c.json({error: `The request is malformed`}, 400)

    if (userId !== parsed.data.userId) return c.json({error: `You can't create a Session for a different user.`}, 401)

    try {
      const session = await createSession({userId, routineId: parsed.data.routineId})
      return c.json({id: session.id })
    } catch(err) {
        if(err instanceof UserNotFound) {
          return c.json({error: `User not found`}, 401)
        }
        console.error(err)
    }
})
