import { z } from 'zod';
import { MIN_PASSWORD_MESSAGE, PASSWORD_MIN_LENGTH } from '#features/auth/constants';

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH, MIN_PASSWORD_MESSAGE),
});

export type LoginSchema = z.infer<typeof loginSchema>;
