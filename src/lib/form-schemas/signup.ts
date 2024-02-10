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
  firstName: 'First name must be at least 2 characters.',
  lastName: 'Last name must be at least 2 characters.',
  email: 'Email is invalid.',
  password: 'Password must be at least 8 characters.',
  agreedToTerms: 'You must agree to the terms.',
};
