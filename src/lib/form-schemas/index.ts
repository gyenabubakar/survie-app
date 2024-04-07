import type { z } from 'zod';
import * as signup from './sign-up';
import * as login from './log-in';
import * as reset from './reset-password';
import * as onboarding from './onboarding';
import * as newPassword from './new-password';
import * as newSurvey from './new-survey';

export function getValidationErrors<T>(
  data: object,
  formSchema: z.Schema,
  fieldErrors: Record<string, string>
): T | null {
  const result = formSchema.safeParse(data);
  if (result.success) return null;

  const errors: Record<string, string> = {};

  console.log('Validation errors:', { errors, data });

  for (const error of result.error.errors) {
    const field = error.path[0];
    errors[field] = error.code === 'custom' ? error.message : fieldErrors[field];
  }

  return errors as T;
}

export function validateForm(
  form: 'sign-up',
  request: Request
): Promise<SignupValidFormResult | SignupInvalidFormResult>;

export function validateForm(
  form: 'log-in',
  request: Request
): Promise<LoginValidFormResult | LoginInvalidFormResult>;

export function validateForm(
  form: 'reset-password',
  request: Request
): Promise<ResetValidFormResult | ResetInvalidFormResult>;

export function validateForm(
  form: 'auth-new-password',
  request: Request
): Promise<NewPasswordValidFormResult | NewPasswordInvalidFormResult>;

export function validateForm(
  form: 'onboarding-company',
  request: Request
): Promise<CompanyInfoValidFormResult | CompanyInfoInvalidFormResult>;

export function validateForm(
  form: 'onboarding-profile',
  request: Request
): Promise<ProfileValidFormResult | ProfileInvalidFormResult>;

export function validateForm(
  form: 'app-new-survey-manual',
  request: Request
): Promise<NewSurveyValidFormResult | NewSurveyInvalidFormResult>;

export async function validateForm(
  form:
    | 'sign-up'
    | 'log-in'
    | 'reset-password'
    | 'auth-new-password'
    | 'onboarding-company'
    | 'onboarding-profile'
    | 'app-new-survey-manual',
  request: Request
): Promise<ValidFormResultType | InvalidFormResultType> {
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
    case 'auth-new-password':
      formSchema = newPassword.formSchema;
      formFieldErrors = newPassword.formFieldErrors;
      break;
    case 'onboarding-company':
      formSchema = onboarding.companyFormSchema;
      formFieldErrors = onboarding.companyFormFieldErrors;
      break;
    case 'onboarding-profile':
      formSchema = onboarding.profileFormSchema;
      formFieldErrors = onboarding.profileFormFieldErrors;
      break;
    case 'app-new-survey-manual':
      formSchema = newSurvey.manualFormSchema;
      formFieldErrors = newSurvey.manualFormFieldErrors;
      break;
    default:
      throw new Error('Invalid form type: ' + form);
  }

  const { success } = formSchema.safeParse(data);
  if (success) return { data } as ValidFormResultType;

  const validationErrors = getValidationErrors<typeof formFieldErrors>(
    data,
    formSchema,
    formFieldErrors
  );

  if ('password' in data) delete data.password;

  return { validationErrors, data } as InvalidFormResultType;
}

/** Type definitions */
type FormSchemaType =
  | typeof signup.formSchema
  | typeof login.formSchema
  | typeof reset.formSchema
  | typeof newPassword.formSchema
  | typeof onboarding.companyFormSchema
  | typeof onboarding.profileFormSchema
  | typeof newSurvey.manualFormSchema;

type FormFieldErrorsType =
  | typeof signup.formFieldErrors
  | typeof login.formFieldErrors
  | typeof reset.formFieldErrors
  | typeof newPassword.formFieldErrors
  | typeof onboarding.companyFormFieldErrors
  | typeof onboarding.profileFormFieldErrors
  | typeof newSurvey.manualFormFieldErrors;

/** Overloaded `validateForm()` return types */

type ValidFormResult<T> = { data: T };

type SignupValidFormResult = ValidFormResult<Omit<signup.FormSchemaZodType, 'password'>>;
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

type NewPasswordValidFormResult = ValidFormResult<newPassword.FormSchemaZodType>;
type NewPasswordInvalidFormResult = {
  validationErrors: typeof newPassword.formFieldErrors | null;
  data: newPassword.FormSchemaZodType;
};

type CompanyInfoValidFormResult = ValidFormResult<onboarding.CompanyFormSchemaZodType>;
type CompanyInfoInvalidFormResult = {
  validationErrors: typeof onboarding.companyFormFieldErrors | null;
  data: onboarding.CompanyFormSchemaZodType;
};

type ProfileValidFormResult = ValidFormResult<onboarding.ProfileFormSchemaZodType>;
type ProfileInvalidFormResult = {
  validationErrors: typeof onboarding.profileFormFieldErrors | null;
  data: onboarding.ProfileFormSchemaZodType;
};

type NewSurveyValidFormResult = ValidFormResult<newSurvey.ManualFormSchemaZodType>;
type NewSurveyInvalidFormResult = {
  validationErrors: typeof newSurvey.manualFormFieldErrors | null;
  data: newSurvey.ManualFormSchemaZodType;
};

/** All return types */
type ValidFormResultType =
  | SignupValidFormResult
  | LoginValidFormResult
  | ResetValidFormResult
  | NewPasswordValidFormResult
  | CompanyInfoValidFormResult
  | ProfileValidFormResult
  | NewSurveyValidFormResult;

type InvalidFormResultType =
  | SignupInvalidFormResult
  | LoginInvalidFormResult
  | ResetInvalidFormResult
  | NewPasswordInvalidFormResult
  | CompanyInfoInvalidFormResult
  | ProfileInvalidFormResult
  | NewSurveyInvalidFormResult;
