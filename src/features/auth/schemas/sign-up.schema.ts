import { z } from 'zod';
import { MIN_PASSWORD_MESSAGE, PASSWORD_MIN_LENGTH } from '#features/auth/constants';

const NAME_REGEX = /^\s*([a-zA-Z]+(?:[\s-][a-zA-Z]+)*){2,255}\s*$/;

export const signupSchema = z.object({
  firstName: z.string().trim().min(2, 'Must be at least 2 characters.').regex(NAME_REGEX),
  lastName: z.string().trim().min(2, 'Must be at least 2 characters.').regex(NAME_REGEX),
  email: z.string().trim().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH, MIN_PASSWORD_MESSAGE),
  agreedToTerms: z.boolean().refine((val) => val, 'Required.'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
