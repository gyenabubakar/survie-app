import { z } from 'zod';
import { imageSchema } from '#lib/schemas';

export const profileSchema = z.object({
  jobTitle: z
    .string()
    .trim()
    .min(3, 'Must be at least 3 characters long.')
    .max(100, 'Only 100 characters are allowed.')
    .refine((s) => !s.startsWith('-') && !s.endsWith('-'), 'Cannot start or end with a hyphen.')
    .refine((s) => /^[a-z\s-]+$/i.test(s), 'Only letters, hyphens and spaces are allowed.'),
  image: imageSchema.nullish(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
