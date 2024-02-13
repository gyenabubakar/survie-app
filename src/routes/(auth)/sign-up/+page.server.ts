import { fail } from '@sveltejs/kit';
import { delay } from '$lib';
import { getValidationErrors } from '$lib/form-schemas';
import { signupFormFieldErrors, signupFormSchema } from '$lib/form-schemas/signup';
import type { SignupFormZodType } from '$lib/form-schemas/signup';

export const actions = {
  async default({ request }) {
    const formData = Object.fromEntries(await request.formData());
    const body = signupFormSchema.safeParse(formData);

    await delay(3000);

    if (!body.success) {
      const validationErrors = getValidationErrors(
        formData,
        signupFormSchema,
        signupFormFieldErrors
      ) as typeof signupFormFieldErrors | null;

      delete formData.password;
      const data = formData as Omit<SignupFormZodType, 'password'>;

      return fail(400, { data, validationErrors });
    }
  },
};
