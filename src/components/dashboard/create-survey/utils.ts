import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { ActionData as DashboardPageActionData } from '../../../routes/app/$types';

export function getSheetContext() {
  return getContext<Context>('sheet');
}

export function getDashboardFormContext() {
  return getContext<DashboardPageContext>('dashboard-page:form');
}

export type ActiveForm = 'ai-form' | 'manual-form' | undefined;
export type ManualSurveyFormData = {
  title: string;
  description: string;
  multiplePages: 'on' | null;
  collectUserInfo: 'on' | null;
};
export type Context = {
  activeForm: Writable<ActiveForm>;
  manualFormData: Writable<ManualSurveyFormData>;
};

export type DashboardPageContext = {
  actionData: Writable<DashboardPageActionData>;
};
