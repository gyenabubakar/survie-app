import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { forgotPasswordSchema } from '#features/auth/schemas';
import { delay } from '#lib';
import { HTTPStatus } from '#lib/http-status';

export async function load() {
  return {
    form: await superValidate(zod(forgotPasswordSchema)),
  };
}

export const actions = {
  async default(event) {
    // TODO: Remove this
    await delay(3000);

    const form = await superValidate(event, zod(forgotPasswordSchema));
    if (!form.valid) return fail(HTTPStatus.BAD_REQUEST, { form });

    console.log('Forgot password?:', form.data);

    return message(form, { status: 'success', text: '' });
  },
};
