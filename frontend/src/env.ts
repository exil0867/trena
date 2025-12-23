import { z } from "zod";

const rawEnv = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
};

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
});

export const env = envSchema.parse(rawEnv);
