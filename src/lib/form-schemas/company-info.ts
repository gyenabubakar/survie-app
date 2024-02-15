// noinspection UnnecessaryLocalVariableJS

import { z } from 'zod';
import { isSupportedImageFile } from '$lib';
import { PNG_JPEG_REGEX, TWO_MEGABYTES } from '$lib/constants';

export const formFieldErrors = {
  name: 'Only letters, numbers, spaces, and hyphens are allowed. Must be between 3 and 100 characters.',
  slug: 'Only small letters and hyphens are allowed. Must be between 3 and 50 characters.',
  image: 'Only JPEG and PNG images are allowed.',
};

export const formSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9\s-]{3,100}$/)
    .transform((data) => data.trim()),
  slug: z.string().regex(/^[a-z-]{3,50}$/),
  image: z.custom(
    (data) => {
      if (!data) return true;
      return isSupportedImageFile(data);
    },
    (data) => {
      const isFile = data instanceof File;
      const params: z.CustomErrorParams = { message: 'Invalid image type.', path: ['image'] };

      if (!isFile || (isFile && !PNG_JPEG_REGEX.test(data.type))) {
        params.message = formFieldErrors.image;
      }

      if (data.size > TWO_MEGABYTES) {
        params.message = 'Image size cannot exceed 2MB.';
      }

      return params;
    }
  ),
});

export type FormSchemaZodType = z.infer<typeof formSchema>;
