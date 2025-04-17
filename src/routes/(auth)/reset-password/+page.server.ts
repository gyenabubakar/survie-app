import { fail } from '@sveltejs/kit';
import { delay } from '#lib';
import { validateForm } from '#lib/form-schemas';

export const actions = {
  async default({ request }) {
    // TODO: Remove this
    await delay(3000);

    const result = await validateForm('reset-password', request);
    if ('validationErrors' in result) {
      return fail(400, { data: result.data, validationErrors: result.validationErrors });
    }

    return { success: true };
  },
};
