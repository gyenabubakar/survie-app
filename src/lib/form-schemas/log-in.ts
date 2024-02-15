import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8),
});

export type FormSchemaZodType = z.infer<typeof formSchema>;

export const formFieldErrors: Record<keyof FormSchemaZodType, string> = {
  email: 'Email is invalid.',
  password: 'Must be at least 8 characters.',
};
