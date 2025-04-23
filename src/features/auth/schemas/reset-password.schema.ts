import { z } from 'zod';
import { MIN_PASSWORD_MESSAGE, PASSWORD_MIN_LENGTH } from '#features/auth/constants';

export const resetPasswordSchema = z
  .object({
    password: z.string().min(PASSWORD_MIN_LENGTH, MIN_PASSWORD_MESSAGE),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH, MIN_PASSWORD_MESSAGE),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
