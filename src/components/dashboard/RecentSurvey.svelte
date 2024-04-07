<script lang="ts">
  import { Fire } from 'phosphor-svelte';
  import { OptionsButton } from '#components';

  export let id: string;
  export let title: string;
  export let description: string;
  export let active: boolean;
  export let responsesIn24h: number;
</script>

<div class="p-6 relative" data-id={id} data-name="RecentSurvey">
  <OptionsButton class="absolute right-4 top-4" />

  <p class="text-gray-700 text-lg font-medium">{title}</p>
  <p class="text-gray-500">{description}</p>

  <div class="flex items-center text-sm mt-2">
    <span class="status px-1.5 py-0.5 rounded" class:active>
      {active ? 'Active' : 'Disabled'}
    </span>
    {#if active}
      <p
        class="responses flex items-center px-1.5 py-0.5 ml-2 rounded"
        class:optimistic={responsesIn24h > 0}
      >
        <Fire weight="fill" class="mr-1" />
        <span>{responsesIn24h} responses in the past 24hrs</span>
      </p>
    {/if}
  </div>
</div>

<style lang="postcss">
  [data-name='RecentSurvey'] {
    &:not(:last-child) {
      @apply border-b border-slate-100;
    }

    & .status,
    & .responses {
      @apply bg-gray-50 text-gray-500;
    }

    & .status.active {
      @apply bg-green-50 text-green-500;
    }
    & .responses.optimistic {
      @apply bg-orange-50 text-orange-500;
    }
  }
</style>
