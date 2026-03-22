import {Hono} from "hono";
import {authMiddleware} from "../../../middleware/auth.ts";
import {CreateRoutine as createRoutineType} from '../../../../../shared/routines/index.schema.ts'
import {createRoutine} from "../logic/create-routine.ts";
import {UserNotFound} from "../../auth/logic/user.ts";

export const routineRoutes = new Hono<{Variables: {userId: string}}>()

routineRoutes.post('/', authMiddleware, async(c) => {
  const userId = c.get('userId')
  const obj = await c.req.json()
  const parsed = createRoutineType.safeParse(obj)
  if (!parsed.success) return c.json({error: 'The request is malformed'}, 400)
  if (userId !== parsed.data.userId) return c.json({error: `You can't create a Routine for a different user.`}, 401)
  try {
    const routine = await createRoutine({userId, programId: parsed.data.programId, title: parsed.data.title})
    return c.json({id: routine.id })
  } catch(err) {
      if(err instanceof UserNotFound) {
        return c.json({error: `User not found`}, 401)
      }
      console.error(err)
  }
})
