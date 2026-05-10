import { z } from "zod";
export const programSchema = z.object({
    title: z.string().min(1, 'Program title is required').max(20, 'Program title is too long'),
    userId: z.uuid()
});
export const CreateProgram = programSchema;
export const CreateProgramResponse = z.object({
    id: z.uuid()
});
