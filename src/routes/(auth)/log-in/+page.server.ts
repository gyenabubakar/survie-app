import { fail } from '@sveltejs/kit';
import { validateForm } from '$lib/form-schemas';
import { delay } from '$lib';

export const actions = {
  async default({ request }) {
    // TODO: Remove this
    await delay(3000);

    const result = await validateForm('log-in', request);
    if ('validationErrors' in result) {
      return fail(400, { data: result.data, validationErrors: result.validationErrors });
    }
  },
};
