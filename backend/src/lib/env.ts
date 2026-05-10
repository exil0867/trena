import z from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string().min(32),
  DB_HOST: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_PORT: z.coerce.number(),

})

export const env = envSchema.parse(process.env)
