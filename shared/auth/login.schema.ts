import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const loginResponseSchema = z.object({
  accessToken: z.string()
})

export type LoginFormValues = z.infer<typeof loginSchema>

export type LoginRequest = z.infer<typeof loginSchema>

export type LoginResponse = z.infer<typeof loginResponseSchema>
