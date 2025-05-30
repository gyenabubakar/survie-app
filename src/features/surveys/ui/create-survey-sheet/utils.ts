import type { ManualFormSchema } from '#features/surveys/schemas';

export type ActiveForm = 'ai-form' | 'manual-form' | undefined;

export const SURVEY_SETTINGS_FIELDS: SurveySettingsField[] = [
  {
    name: 'multiplePages',
    label: 'Attempt to collect user info from participant.',
    tooltip:
      'By default, all questions show on a single page. Enabling this option will show the questions over multiple pages. (1 question per page)',
  },
  {
    name: 'collectUserInfo',
    label: 'Collect User Info',
    tooltip:
      'Enabling this option will attempt to collect user information from the participant. This includes their name, email, and other details.',
  },
];

export const FORM_CREATION_OPTIONS: FormCreationOption[] = [
  {
    name: 'ai-form',
    label: 'Create your survey with AI',
    description:
      'Give a brief description of your product and the focus of your survey and let AI do the rest.',
  },
  {
    name: 'manual-form',
    label: 'Manually create your survey',
    description:
      'Have full control when creating all your questions, question types and survey options.',
  },
];

type FormCreationOption = {
  name: Exclude<ActiveForm, undefined>;
  label: string;
  description: string;
};

type SurveySettingsField = {
  name: Extract<keyof ManualFormSchema, 'multiplePages' | 'collectUserInfo'>;
  label: string;
  tooltip: string;
};
