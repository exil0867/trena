import { z } from 'zod'

export const signupSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine(data => data.password === data.confirmPassword, {
  error: 'Passwords do not match',
  path: ['confirmPassword']
});

export type SignupFormValues = z.infer<typeof signupSchema>
