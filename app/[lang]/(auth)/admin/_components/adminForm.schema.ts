import { z } from 'zod';

export const signinFormDataSchema = z.object({
  email: z.string().trim().email('Invalid email address'),

  password: z
    .string()
    .trim()
    .min(1, 'Password is required'),

  otp: z
    .string()
    .trim()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must be numeric'),
});