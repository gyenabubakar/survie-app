import { fail } from '@sveltejs/kit';
import { delay } from '$lib';
import { getValidationErrors } from '$lib/form-schemas';
import { loginFormFieldErrors, loginFormSchema } from '$lib/form-schemas/login';
import type { SignupFormZodType } from '$lib/form-schemas/signup';

export const actions = {
  async default({ request }) {
    const formData = Object.fromEntries(await request.formData());
    const body = loginFormSchema.safeParse(formData);

    await delay(3000);

    if (!body.success) {
      const validationErrors = getValidationErrors<typeof loginFormFieldErrors>(
        formData,
        loginFormSchema,
        loginFormFieldErrors
      );

      delete formData.password;
      const data = formData as Omit<SignupFormZodType, 'password'>;

      return fail(400, { data, validationErrors });
    }
  },
};
