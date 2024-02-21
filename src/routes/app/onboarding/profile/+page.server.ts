import { fail } from '@sveltejs/kit';
import { delay } from '$lib';
import { validateForm } from '$lib/form-schemas';

export const actions = {
  async default({ request }) {
    // TODO: Remove this
    await delay(3000);

    const result = await validateForm('onboarding-profile', request);
    if ('validationErrors' in result) {
      delete result.data.image;
      const { data, validationErrors } = result;
      return fail(400, { data, validationErrors });
    }

    console.log('result', result);
  },
};
