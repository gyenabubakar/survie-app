import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  agreedToTerms: z.literal('on'),
});

export type FormSchemaZodType = z.infer<typeof formSchema>;

export const formFieldErrors: Record<keyof FormSchemaZodType, string> = {
  firstName: 'Must be at least 2 letters.',
  lastName: 'Must be at least 2 letters.',
  email: 'Email is invalid.',
  password: 'Must be at least 8 characters.',
  agreedToTerms: 'You must agree to the terms.',
};
