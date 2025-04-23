<script lang="ts">
import { Fire } from 'phosphor-svelte';
import { OptionsButton } from '#components';

type Props = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  responsesIn24h: number;
};

let { id, title, description, active, responsesIn24h }: Props = $props();
</script>

<div class="relative p-6" data-id={id} data-name="RecentSurvey">
  <OptionsButton class="absolute right-4 top-4" />

  <p class="text-lg font-medium text-gray-700">{title}</p>
  <p class="text-gray-500">{description}</p>

  <div class="mt-2 flex items-center text-sm">
    <span class="status rounded px-1.5 py-0.5" class:active>
      {active ? 'Active' : 'Disabled'}
    </span>
    {#if active}
      <p
        class="responses ml-2 flex items-center rounded px-1.5 py-0.5"
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
