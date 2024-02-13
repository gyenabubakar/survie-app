import { fail } from '@sveltejs/kit';
import { delay } from '$lib';
import { formSchema, type FormSchemaZodType } from '$lib/form-schemas/new-password';

export const actions = {
  async default({ request }) {
    // TODO: Remove this
    await delay(3000);

    const formData = Object.fromEntries(await request.formData());

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      let validationErrors: Record<string, string> | undefined;

      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormSchemaZodType | undefined;
        if (typeof field === 'string' && error.code === 'too_small') {
          if (!validationErrors) validationErrors = {};
          validationErrors[field] = 'Must be at least 8 characters.';
        }
      });

      const error = result.error.errors.find((error) => error.code === 'custom')
        ? 'Passwords do not match.'
        : undefined;

      return fail(400, {
        error,
        validationErrors: validationErrors as Record<keyof FormSchemaZodType, string> | undefined,
      });
    }

    return { success: true };
  },
};
