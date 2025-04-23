import { z } from 'zod';

export const manualFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Must be at least 3 characters.')
    .max(100, 'Must be 100 characters at most.'),
  description: z.string().trim().max(512, 'Must be 512 characters at most.'),
  multiplePages: z.boolean(),
  collectUserInfo: z.boolean(),
});

export type ManualFormSchema = z.input<typeof manualFormSchema>;
