import { z } from "zod";
const routineSchema = z.object({
    title: z.string().min(1, 'Routine title is required').max(20, 'Routine title is too long'),
    userId: z.uuid(),
    programId: z.uuid()
});
export const CreateRoutine = routineSchema;
export const CreateRoutineResponse = z.object({
    id: z.uuid()
});
