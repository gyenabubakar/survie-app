import { getContext, setContext } from 'svelte';
import type { ActiveForm } from './utils';

export class CreateSurveySheetContext {
  static readonly KEY = Symbol('CreateSurveySheetContext');

  activeForm: ActiveForm = $state();

  constructor() {
    setContext(CreateSurveySheetContext.KEY, this);
  }

  static use() {
    const context = getContext<CreateSurveySheetContext>(CreateSurveySheetContext.KEY);
    if (!context) {
      throw new Error('NewSurveySheetContext not found in component hierarchy.');
    }
    return context;
  }
}
