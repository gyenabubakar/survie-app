<script lang="ts">
  import { TrendDown, TrendUp } from 'phosphor-svelte';
  import { Card, CardContent } from 'shadcn-ui/card';
  import type { StatType } from '#components/dashboard/types';

  export let stats: StatType[];
</script>

<section class="grid grid-cols-4 gap-4">
  {#each stats as stat, index (index)}
    <Card>
      <CardContent class="card-content">
        <p class="text-sm text-gray-500">{stat.title}</p>
        <p class="text-3xl font-bold my-1 font-mono">
          {stat.value}{stat.valueUnit ?? ''}
        </p>
        <p
          class="stat-footer"
          class:trend-none={stat.trend === 'none'}
          class:trend-up={stat.trend === 'up'}
          class:trend-down={stat.trend === 'down'}
        >
          {#if stat.footer}
            {stat.footer}
          {:else}
            {#if stat.trend !== 'none'}
              <svelte:component
                this={stat.trend === 'up' ? TrendUp : TrendDown}
                weight="bold"
                size="18px"
              />
            {/if}
            <span style="font-family: monospace" class="stat-footer--percentage">
              {stat.percentage}%
            </span>
            &nbsp;&nbsp;from last month
          {/if}
        </p>
      </CardContent>
    </Card>
  {/each}
</section>

<style lang="postcss">
  .stat-footer {
    @apply flex items-center text-sm text-gray-500;

    & .stat-footer--percentage {
      @apply ml-1 font-medium;
    }

    &:global(.trend-none svg),
    &.trend-none .stat-footer--percentage {
      @apply text-gray-600;
    }

    &:global(.trend-up svg),
    &.trend-up .stat-footer--percentage {
      @apply text-green-500;
    }

    &:global(.trend-down svg),
    &.trend-down .stat-footer--percentage {
      @apply text-red-500;
    }
  }

  :global(.card-content) {
    @apply p-4;
  }
</style>
