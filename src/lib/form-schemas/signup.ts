import { z } from 'zod';

export const signupFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  agreedToTerms: z.literal('on'),
});
export type SignupFormZodType = z.infer<typeof signupFormSchema>;
export const signupFormFieldErrors: Record<keyof SignupFormZodType, string> = {
  firstName: 'Must be at least 2 letters.',
  lastName: 'Must be at least 2 letters.',
  email: 'Email is invalid.',
  password: 'Must be at least 8 characters.',
  agreedToTerms: 'You must agree to the terms.',
};
