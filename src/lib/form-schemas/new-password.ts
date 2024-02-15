import { z } from 'zod';

export const formSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['*'],
  });

export type FormSchemaZodType = z.infer<typeof formSchema>;

export const formFieldErrors: Record<keyof FormSchemaZodType, string> & { '*'?: string } = {
  password: 'Password must be at least 8 characters long.',
  confirmPassword: 'Password must be at least 8 characters long.',
  '*': 'Passwords do not match.',
};
