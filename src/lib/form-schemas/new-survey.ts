// noinspection SuspiciousTypeOfGuard

import { z } from 'zod';

export const manualFormSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.union([z.string().trim().length(0).max(255), z.string().trim().max(500)]),
  multiplePages: z.optional(z.literal('on')),
  collectUserInfo: z.optional(z.literal('on')),
});

export type ManualFormSchemaZodType = z.infer<typeof manualFormSchema>;

export const manualFormFieldErrors: Record<keyof ManualFormSchemaZodType, string> = {
  title: 'Must be between 3 and 100 characters',
  description: 'Must be less than 500 characters',
  multiplePages: 'This field is required',
  collectUserInfo: 'This field is required',
};
