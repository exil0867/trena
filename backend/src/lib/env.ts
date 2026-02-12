import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32)
})

export const env = envSchema.parse(process.env)
