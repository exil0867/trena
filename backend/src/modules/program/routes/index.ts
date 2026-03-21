import {Hono} from "hono";
import {CreateProgram as createProgramType} from "../../../../../shared/program/index.schema.ts";
import {authMiddleware} from "../../../middleware/auth.ts";
import { UserNotFound} from "../../auth/logic/user.ts";
import { createProgram } from "../logic/create-program.ts";

export const programRoutes = new Hono< { Variables: { userId: string } } >()

programRoutes.post('/', authMiddleware, async(c) => {
  const userId = c.get('userId')
  const obj = await c.req.json()
  const parsed = createProgramType.safeParse(obj)
  if (!parsed.success) return c.json({error: 'The request is malformed'}, 400)
  if (userId !== parsed.data.userId) return c.json({error: `You can't create a Program for a different user.`}, 401)
    try {
      const programId = createProgram({userId, title: parsed.data.title})
      return c.json({ id: programId })
  } catch (err) {
    if (err instanceof UserNotFound) {
      return c.json({error: 'User not found'}, 401)
    }
    console.error(err)
  }

})
