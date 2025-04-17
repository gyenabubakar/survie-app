<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { writable } from 'svelte/store';
  import { Sheet, SheetTrigger, SheetContent } from 'shadcn-ui/sheet';
  import SurveyFormOptions from './survey-form-options.svelte';
  import type { ActiveForm, Context, ManualSurveyFormData } from './utils';
  import type { Builder } from 'bits-ui';

  type Props = {
    children?: Snippet<[{ builders: Builder[] }]>;
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
    !isOpen && activeForm.set(undefined);
  }
</script>

<Sheet preventScroll={false} {onOpenChange}>
  <SheetTrigger asChild let:builder>
    {@render children?.({ builders: [builder] })}
  </SheetTrigger>

  <SheetContent id="some-id" class="w-full md:max-w-md overflow-x-hidden">
    <p class="text-2xl font-medium mt-8 mb-4">Create new survey</p>

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
