import { fail } from '@sveltejs/kit';
import { delay } from '$lib';
import { validateForm } from '$lib/form-schemas';

export const actions = {
  async default({ request }) {
    // TODO: Remove this
    await delay(3000);

    const result = await validateForm('auth-new-password', request);
    if ('validationErrors' in result && result.validationErrors) {
      const { validationErrors } = result;
      if (validationErrors['*']) {
        const error = validationErrors['*'] as string | undefined;
        delete validationErrors['*'];

        return fail(400, {
          error,
          validationErrors: validationErrors as typeof validationErrors | undefined,
        });
      }

      return fail(400, { validationErrors });
    }

    return { success: true };
  },
};
