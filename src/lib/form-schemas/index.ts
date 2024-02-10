import { z } from 'zod';

export function getValidationErrors<T extends z.ZodRawShape>(
  data: object,
  formSchema: z.ZodObject<T>,
  fieldErrors: Record<string, string>
): Record<string, string> | null {
  const result = formSchema.safeParse(data);
  if (result.success) return null;

  const errors: Record<string, string> = {};
  for (const error of result.error.errors) {
    const field = error.path[0];
    errors[field] = fieldErrors[field];
  }

  return errors;
}
