import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string().min(32),

  DB_HOST: z.string().default("127.0.0.1"),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().default("postgres"),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
