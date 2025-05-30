import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '#features/auth/schemas';
import { delay } from '#lib';
import { HTTPStatus } from '#lib/http-status';

export async function load() {
  return {
    form: await superValidate(zod(loginSchema)),
  };
}

export const actions = {
  async default(event) {
    // TODO: Remove this
    await delay(3_000);

    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid) return fail(HTTPStatus.BAD_REQUEST, { form });

    console.log('Log in:', form.data);

    return message(form, { status: 'success', text: '' });
  },
};
