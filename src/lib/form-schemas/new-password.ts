import { z } from 'zod';

export const formSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
  });

export type FormSchemaZodType = z.infer<typeof formSchema>;
