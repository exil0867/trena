import {z} from "zod";

const bodyweightSchema = z.object({
  userId: z.uuid(),
  weight: z.number().min(0).max(1000)
})

export const CreateBodyweight = bodyweightSchema

export const CreateBodyweightResponse = z.object({
  id: z.uuid()
})

export type CreateBodyweightRequest = z.infer<typeof CreateBodyweight>

export type CreateBodyweightResponse = z.infer<typeof CreateBodyweightResponse>
