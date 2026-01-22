import { z } from 'zod'

export const signupSchema = z.object({
  email: z.email('Invalid email address'),
  username: z.string().min(1, 'A username is required').max(32, 'Username is too long'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const frontendSignupSchema = signupSchema.extend({
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine(data => data.password === data.confirmPassword, {
  error: 'Passwords do not match',
  path: ['confirmPassword']
})

export type FrontendSignupFormValues = z.infer<typeof frontendSignupSchema>

export type SignupFormValues = z.infer<typeof frontendSignupSchema>
