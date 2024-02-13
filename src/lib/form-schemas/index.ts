import { z } from 'zod';
import * as signup from './sign-up';
import * as login from './log-in';
import * as reset from './reset-password';

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

export async function validateForm(
  form: 'sign-up',
  request: Request
): Promise<SignupValidFormResult | SignupInvalidFormResult>;

export async function validateForm(
  form: 'log-in',
  request: Request
): Promise<LoginValidFormResult | LoginInvalidFormResult>;

export async function validateForm(
  form: 'reset-password',
  request: Request
): Promise<ResetValidFormResult | ResetInvalidFormResult>;

export async function validateForm(
  form: 'sign-up' | 'log-in' | 'reset-password',
  request: Request
) {
  let body: BodyType;
  let formSchema: FormSchemaType;
  let formFieldErrors: FormFieldErrorsType;

  const formData = Object.fromEntries(await request.formData());

  switch (form) {
    case 'sign-up':
      formSchema = signup.formSchema;
      formFieldErrors = signup.formFieldErrors;
      body = formSchema.safeParse(formData);
      break;
    case 'log-in':
      formSchema = login.formSchema;
      formFieldErrors = login.formFieldErrors;
      body = formSchema.safeParse(formData);
      break;
    case 'reset-password':
      formSchema = reset.formSchema;
      formFieldErrors = reset.formFieldErrors;
      body = formSchema.safeParse(formData);
      break;
    default:
      throw new Error('Invalid form type: ' + form);
  }

  if (body.success) return { data: formData };

  const validationErrors = getValidationErrors<typeof formFieldErrors>(
    formData,
    formSchema,
    formFieldErrors
  );

  if ('password' in formData) delete formData.password;

  switch (form) {
    case 'sign-up':
      return { validationErrors, data: formData as Omit<signup.FormSchemaZodType, 'password'> };
    case 'log-in':
      return { validationErrors, data: formData as Omit<login.FormSchemaZodType, 'password'> };
    case 'reset-password':
      return {
        validationErrors,
        data: formData as reset.FormSchemaZodType,
      };
  }
}

/** Type definitions */

type BodyType =
  | z.SafeParseReturnType<signup.FormSchemaZodType, signup.FormSchemaZodType>
  | z.SafeParseReturnType<login.FormSchemaZodType, login.FormSchemaZodType>
  | z.SafeParseReturnType<reset.FormSchemaZodType, reset.FormSchemaZodType>;

type FormSchemaType = typeof signup.formSchema | typeof login.formSchema | typeof reset.formSchema;

type FormFieldErrorsType =
  | typeof signup.formFieldErrors
  | typeof login.formFieldErrors
  | typeof reset.formFieldErrors;

/** Overloaded validateForm function return types */

type ValidFormResult<T> = { data: T };

type SignupValidFormResult = ValidFormResult<signup.FormSchemaZodType>;
type SignupInvalidFormResult = {
  validationErrors: typeof signup.formFieldErrors | null;
  data: Omit<signup.FormSchemaZodType, 'password'>;
};

type LoginValidFormResult = ValidFormResult<login.FormSchemaZodType>;
type LoginInvalidFormResult = {
  validationErrors: typeof login.formFieldErrors | null;
  data: Omit<login.FormSchemaZodType, 'password'>;
};

type ResetValidFormResult = ValidFormResult<reset.FormSchemaZodType>;
type ResetInvalidFormResult = {
  validationErrors: typeof reset.formFieldErrors | null;
  data: reset.FormSchemaZodType;
};
