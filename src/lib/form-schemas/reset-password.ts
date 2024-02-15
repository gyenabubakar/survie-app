import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email(),
});

export type FormSchemaZodType = z.infer<typeof formSchema>;

export const formFieldErrors: Record<keyof FormSchemaZodType, string> = {
  email: 'Email is invalid.',
} as const;
