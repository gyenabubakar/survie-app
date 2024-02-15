import { delay } from '$lib';
import { validateForm } from '$lib/form-schemas';
import { fail } from '@sveltejs/kit';

export const actions = {
  async default({ request }) {
    // TODO: Remove this
    await delay(3000);

    const result = await validateForm('company-info', request);
    if ('validationErrors' in result) {
      delete result.data.image;
      const { data, validationErrors } = result;
      return fail(400, { data, validationErrors });
    }

    console.log('result', result);
  },
};