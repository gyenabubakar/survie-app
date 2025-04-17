import { fail } from '@sveltejs/kit';
import { delay } from '#lib';
import { validateForm } from '#lib/form-schemas';

export const actions = {
  async default({ request }) {
    // TODO: Remove this
    await delay(3000);

    const result = await validateForm('sign-up', request);
    if ('validationErrors' in result) {
      const { validationErrors, data } = result;
      return fail(400, { data, validationErrors });
    }

    return { success: true };
  },
};
