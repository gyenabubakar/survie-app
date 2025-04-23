import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from '#features/auth/schemas';
import { delay } from '#lib';
import { HTTPStatus } from '#lib/http-status';

export async function load() {
  return {
    form: await superValidate(zod(signupSchema)),
  };
}

export const actions = {
  async default(event) {
    // TODO: Remove this
    await delay(3000);

    const form = await superValidate(event, zod(signupSchema));
    if (!form.valid) return fail(HTTPStatus.BAD_REQUEST, { form });

    console.log('Sign up:', form.data);

    return { form };
  },
};
