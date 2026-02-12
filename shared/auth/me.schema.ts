import { z } from 'zod'
import {signupSchema} from "./signup.schema";

const mePickedSchema = signupSchema.pick({
  email: true,
  username: true
})

export const meSchema = mePickedSchema.extend({
  id: z.uuid(),
})


export type MeResponse = z.infer<typeof meSchema>
