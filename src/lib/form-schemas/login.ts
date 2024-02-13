import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginFormZodType = z.infer<typeof loginFormSchema>;

export const loginFormFieldErrors: Record<keyof LoginFormZodType, string> = {
  email: 'Email is invalid.',
  password: 'Must be at least 8 characters.',
} as const;
