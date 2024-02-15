// noinspection UnnecessaryLocalVariableJS

import { z } from 'zod';

const TWO_MEGABYTES = 1024 * 1024 * 2;

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

      const isSupportedImage = data instanceof File && data.type.startsWith('image/');
      const isNotBiggerThan2MB = isSupportedImage && data.size <= TWO_MEGABYTES;

      return isNotBiggerThan2MB;
    },
    (data) => {
      const params: z.CustomErrorParams = { message: 'Invalid image type.', path: ['image'] };

      const isFile = data instanceof File;
      if (!isFile || (isFile && !/^image\/(png|jpe?g)$/.test(data.type))) {
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
