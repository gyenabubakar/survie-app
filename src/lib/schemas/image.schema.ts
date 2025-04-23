import { z } from 'zod';
import { PNG_JPEG_REGEX, TWO_MEGABYTES } from '#lib/constants';

export const imageSchema = z
  .instanceof(File)
  .refine((f) => PNG_JPEG_REGEX.test(f.type), 'Only PNG and JPEG images are allowed.')
  .refine((f) => f.size > 0, 'Image size must be greater than 0.')
  .refine((f) => f.size <= TWO_MEGABYTES, 'Image size cannot exceed 2MB.');
