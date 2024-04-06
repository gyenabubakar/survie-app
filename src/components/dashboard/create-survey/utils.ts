import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

export type ActiveForm = 'ai-form' | 'manual-form' | undefined;
export type Context = {
  form: Writable<ActiveForm>;
};

export function getSheetContext() {
  return getContext<Context>('sheet');
}
