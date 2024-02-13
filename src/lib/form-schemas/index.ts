import { z } from 'zod';

export function getValidationErrors<T>(
  data: object,
  formSchema: z.Schema,
  fieldErrors: Record<string, string>
): T | null {
  const result = formSchema.safeParse(data);
  if (result.success) return null;

  const errors: Record<string, string> = {};
  for (const error of result.error.errors) {
    const field = error.path[0];
    errors[field] = fieldErrors[field];
  }

  return errors as T;
}
