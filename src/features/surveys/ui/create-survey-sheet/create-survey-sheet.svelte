<script lang="ts">
import type { Snippet } from 'svelte';
import * as Sheet from 'shadcn/sheet';
import { CreateSurveySheetContext } from './context.svelte';
import SurveyFormOptions from './survey-form-options.svelte';

type Props = {
  children?: Snippet<[{ props: any }]>;
  manualForm?: Snippet;
  aiForm?: Snippet;
};

let { children, manualForm, aiForm }: Props = $props();

const ctx = new CreateSurveySheetContext();

function onOpenChange(open: boolean) {
  if (!open) {
    setTimeout(() => {
      ctx.activeForm = undefined;
    }, 300);
    return;
  }
}
</script>

<Sheet.Root {onOpenChange}>
  <Sheet.Trigger>
    {#snippet child({ props })}
      {@render children?.({ props })}
    {/snippet}
  </Sheet.Trigger>

  <Sheet.Content id="some-id" class="w-full overflow-x-hidden md:max-w-md">
    <p class="mb-4 mt-8 text-2xl font-medium">Create new survey</p>

    <div id="state" class="relative">
      {#if !ctx.activeForm}
        <SurveyFormOptions />
      {:else if ctx.activeForm === 'manual-form'}
        {@render manualForm?.()}
      {:else}
        {@render aiForm?.()}
      {/if}
    </div>
  </Sheet.Content>
</Sheet.Root>

<style lang="postcss">
#state > :global(*) {
  @apply absolute;
}
</style>
