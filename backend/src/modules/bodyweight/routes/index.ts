import {Hono} from "hono";
import {authMiddleware} from "../../../middleware/auth.ts";
import {CreateBodyweight as createBodyweightType} from '../../../../../shared/bodyweight/index.schema.ts'
import {addBodyweight} from "../logic/add-bodyweight.ts";
import {UserNotFound} from "../../auth/logic/user.ts";

export const bodyweightRoutes = new Hono<{Variables: {userId: string}}>()

bodyweightRoutes.post('/', authMiddleware, async (c) => {
  const userId = c.get('userId')
  const obj = await c.req.json()
  const parsed = createBodyweightType.safeParse(obj)
  if (!parsed.success) {
    return c.json({
      error: `The request object is malformed`
    }, 400)
  }
  if (userId !== parsed.data.userId) return c.json({error: `You can't create a routine for a different user.`}, 401)

  try {
    const bodyweight = await addBodyweight({
      userId: userId,
      weight: parsed.data.weight
    })
    return c.json({id: bodyweight.id})
  } catch(err) {
    if (err instanceof UserNotFound) {
      c.json({error: `User not found`}, 401)

    }
    console.error(err)
  }

})
