import { z } from 'zod';
import { imageSchema } from '#lib/schemas';

export const companyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Must be at least 3 characters long.')
    .max(100, 'Only 100 characters are allowed.')
    .refine((s) => !s.startsWith('-') && !s.endsWith('-'), 'Cannot start or end with a hyphen.')
    .refine(
      (s) => /^[a-z0-9\s-]+$/i.test(s),
      'Only letters, numbers, spaces, and hyphens are allowed.',
    ),
  slug: z
    .string()
    .trim()
    .min(3, 'Must be at least 3 characters long.')
    .max(50, 'Only 50 characters are allowed.')
    .refine((s) => !s.startsWith('-') && !s.endsWith('-'), 'Cannot start or end with a hyphen.')
    .refine(
      (s) => /^[a-z0-9-]+$/.test(s),
      'Only lowercase letters, numbers and hyphens are allowed.',
    ),
  image: imageSchema.nullish(),
});

export type CompanySchema = z.infer<typeof companyFormSchema>;
