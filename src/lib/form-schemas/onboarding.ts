// noinspection UnnecessaryLocalVariableJS

import { z } from 'zod';
import { isSupportedImageFile } from '$lib';
import { PNG_JPEG_REGEX, TWO_MEGABYTES } from '$lib/constants';

function validateImage(message: string) {
  return z.custom(
    (data) => {
      if (!data) return true;
      return isSupportedImageFile(data);
    },
    (data) => {
      const isFile = data instanceof File;
      const params: z.CustomErrorParams = { message: 'Invalid image type.', path: ['image'] };

      if (!isFile || (isFile && !PNG_JPEG_REGEX.test(data.type))) {
        params.message = message;
      }

      if (data.size > TWO_MEGABYTES) {
        params.message = 'Image size cannot exceed 2MB.';
      }

      return params;
    }
  );
}

export const companyFormFieldErrors = {
  name: 'Only letters, numbers, spaces, and hyphens are allowed. Must be between 3 and 100 characters.',
  slug: 'Only small letters and hyphens are allowed. Must be between 3 and 50 characters.',
  image: 'Only JPEG and PNG images are allowed.',
};
export const companyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9\s-]{3,100}$/),
  slug: z.string().regex(/^[a-z-]{3,50}$/),
  image: validateImage(companyFormFieldErrors.image),
});
export type CompanyFormSchemaZodType = z.infer<typeof companyFormSchema>;

// PROFILE
export const profileFormFieldErrors = {
  jobTitle: 'Only letters, hyphens and spaces are allowed. Must be between 3 and 100 characters.',
  image: 'Only JPEG and PNG images are allowed.',
};
export const profileFormSchema = z.object({
  jobTitle: z
    .string()
    .regex(/^[\w\s-]{3,100}$/)
    .trim(),
  image: validateImage(profileFormFieldErrors.image),
});
export type ProfileFormSchemaZodType = z.infer<typeof profileFormSchema>;
