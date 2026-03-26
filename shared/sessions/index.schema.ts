import {z} from "zod";

const sessionSchema = z.object({
    userId: z.uuid(),
    routineId: z.uuid()
})

export const CreateSession = sessionSchema

export const CreateSessionResponse = z.object({
    id: z.uuid()
})

export type CreateSessionRequest = z.infer<typeof sessionSchema>

export type CreateRoutineResponse = z.infer<typeof CreateSessionResponse>