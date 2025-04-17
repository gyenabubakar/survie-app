<script lang="ts">
import { setContext } from 'svelte';
import { writable } from 'svelte/store';
import type { Snippet } from 'svelte';
import { Sheet, SheetContent, SheetTrigger } from 'shadcn/sheet';
import SurveyFormOptions from './survey-form-options.svelte';
import type { ActiveForm, Context, ManualSurveyFormData } from './utils';

type Props = {
  children?: Snippet<[{ props: any }]>;
  manualForm?: Snippet;
  aiForm?: Snippet;
};

let { children, manualForm, aiForm }: Props = $props();

const activeForm = writable<ActiveForm>(undefined);
const manualFormData = writable<ManualSurveyFormData>({
  title: '',
  description: '',
  multiplePages: null,
  collectUserInfo: null,
});

setContext<Context>('sheet', { activeForm, manualFormData });

function onOpenChange(isOpen: boolean) {
  if (!isOpen) activeForm.set(undefined);
}
</script>

<Sheet {onOpenChange}>
  <SheetTrigger>
    {#snippet child({ props })}
      {@render children?.({ props })}
    {/snippet}
  </SheetTrigger>

  <SheetContent id="some-id" class="w-full overflow-x-hidden md:max-w-md">
    <p class="mb-4 mt-8 text-2xl font-medium">Create new survey</p>

    <div id="state" class="relative">
      {#if !$activeForm}
        <SurveyFormOptions />
      {:else if $activeForm === 'manual-form'}
        {@render manualForm?.()}
      {:else}
        {@render aiForm?.()}
      {/if}
    </div>
  </SheetContent>
</Sheet>

<style lang="postcss">
#state > :global(*) {
  @apply absolute;
}
</style>
