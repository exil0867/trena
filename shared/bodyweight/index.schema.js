import { z } from "zod";
export const bodyweightSchema = z.object({
    userId: z.uuid(),
    weight: z.coerce.number().min(0).max(1000)
});
export const CreateBodyweight = bodyweightSchema;
export const CreateBodyweightResponse = z.object({
    id: z.uuid()
});
