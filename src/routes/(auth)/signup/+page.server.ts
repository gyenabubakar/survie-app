import { fail } from '@sveltejs/kit';
import { getValidationErrors } from '$lib/form-schemas';
import { signupFormFieldErrors, signupFormSchema } from '$lib/form-schemas/signup';
import type { SignupFormZodType } from '$lib/form-schemas/signup';

export const actions = {
  async default({ request }) {
    const formData = Object.fromEntries(await request.formData());
    const body = signupFormSchema.safeParse(formData);

    if (!body.success) {
      const validationErrors = getValidationErrors(
        formData,
        signupFormSchema,
        signupFormFieldErrors
      );

      delete formData.password;
      const data = formData as Omit<SignupFormZodType, 'password'>;

      return fail(400, { validationErrors, data });
    }
  },
};
