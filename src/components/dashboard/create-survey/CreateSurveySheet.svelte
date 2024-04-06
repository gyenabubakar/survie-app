<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { Sheet, SheetTrigger, SheetContent } from 'shadcn-ui/sheet';
  import SurveyFormOptions from './SurveyFormOptions.svelte';
  import type { ActiveForm, Context } from './utils';

  const form = writable<ActiveForm>(undefined);

  setContext<Context>('sheet', { form });

  function onOpenChange(isOpen: boolean) {
    !isOpen && form.set(undefined);
  }
</script>

<Sheet preventScroll={false} {onOpenChange}>
  <SheetTrigger asChild let:builder>
    <slot builders={[builder]} />
  </SheetTrigger>

  <SheetContent id="some-id" class="w-full md:max-w-md overflow-x-hidden">
    <p class="text-2xl font-medium mt-8 mb-4">Create new survey</p>

    <div id="state" class="relative">
      {#if !$form}
        <SurveyFormOptions />
      {:else if $form === 'manual-form'}
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
