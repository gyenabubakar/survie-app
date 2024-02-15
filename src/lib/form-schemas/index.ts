import { z } from 'zod';
import * as signup from './sign-up';
import * as login from './log-in';
import * as reset from './reset-password';
import * as companyInfo from './company-info';
import * as newPassword from './new-password';

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
    errors[field] = error.code === 'custom' ? error.message : fieldErrors[field];
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
  form: 'company-info',
  request: Request
): Promise<CompanyInfoValidFormResult | CompanyInfoInvalidFormResult>;

export async function validateForm(
  form: 'auth-new-password',
  request: Request
): Promise<NewPasswordValidFormResult | NewPasswordInvalidFormResult>;

export async function validateForm(
  form: 'sign-up' | 'log-in' | 'reset-password' | 'company-info' | 'auth-new-password',
  request: Request
) {
  let formSchema: FormSchemaType;
  let formFieldErrors: FormFieldErrorsType;

  const data = Object.fromEntries(await request.formData());

  switch (form) {
    case 'sign-up':
      formSchema = signup.formSchema;
      formFieldErrors = signup.formFieldErrors;
      break;
    case 'log-in':
      formSchema = login.formSchema;
      formFieldErrors = login.formFieldErrors;
      break;
    case 'reset-password':
      formSchema = reset.formSchema;
      formFieldErrors = reset.formFieldErrors;
      break;
    case 'company-info':
      formSchema = companyInfo.formSchema;
      formFieldErrors = companyInfo.formFieldErrors;
      break;
    case 'auth-new-password':
      formSchema = newPassword.formSchema;
      formFieldErrors = newPassword.formFieldErrors;
      break;
    default:
      throw new Error('Invalid form type: ' + form);
  }

  const { success: isValid } = formSchema.safeParse(data);
  if (isValid) return { data };

  const validationErrors = getValidationErrors<typeof formFieldErrors>(
    data,
    formSchema,
    formFieldErrors
  );

  if ('password' in data) delete data.password;

  return { validationErrors, data };
}

/** Type definitions */
type FormSchemaType =
  | typeof signup.formSchema
  | typeof login.formSchema
  | typeof reset.formSchema
  | typeof companyInfo.formSchema
  | typeof newPassword.formSchema;

type FormFieldErrorsType =
  | typeof signup.formFieldErrors
  | typeof login.formFieldErrors
  | typeof reset.formFieldErrors
  | typeof companyInfo.formFieldErrors
  | typeof newPassword.formFieldErrors;

/** Overloaded `validateForm()` return types */

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

type CompanyInfoValidFormResult = ValidFormResult<companyInfo.FormSchemaZodType>;
type CompanyInfoInvalidFormResult = {
  validationErrors: typeof companyInfo.formFieldErrors | null;
  data: companyInfo.FormSchemaZodType;
};

type NewPasswordValidFormResult = ValidFormResult<newPassword.FormSchemaZodType>;
type NewPasswordInvalidFormResult = {
  validationErrors: typeof newPassword.formFieldErrors | null;
  data: newPassword.FormSchemaZodType;
};
