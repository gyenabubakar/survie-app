<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { Sheet, SheetTrigger, SheetContent } from 'shadcn-ui/sheet';
  import SurveyFormOptions from './SurveyFormOptions.svelte';
  import type { ActiveForm, Context, ManualSurveyFormData } from './utils';

  const activeForm = writable<ActiveForm>(undefined);
  const manualFormData = writable<ManualSurveyFormData>({
    title: '',
    description: '',
    multiplePages: null,
    collectUserInfo: null,
  });

  setContext<Context>('sheet', { activeForm, manualFormData });

  function onOpenChange(isOpen: boolean) {
    !isOpen && activeForm.set(undefined);
  }
</script>

<Sheet preventScroll={false} {onOpenChange}>
  <SheetTrigger asChild let:builder>
    <slot builders={[builder]} />
  </SheetTrigger>

  <SheetContent id="some-id" class="w-full md:max-w-md overflow-x-hidden">
    <p class="text-2xl font-medium mt-8 mb-4">Create new survey</p>

    <div id="state" class="relative">
      {#if !$activeForm}
        <SurveyFormOptions />
      {:else if $activeForm === 'manual-form'}
        <slot name="manual-form" />
      {:else}
        <slot name="ai-form" />
      {/if}
    </div>
  </SheetContent>
</Sheet>

<style lang="postcss">
  #state > :global(*) {
    @apply absolute;
  }
</style>
