<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import { Container } from '#components';
  import { Card, CardContent } from '#shadcn-ui/card';
  import { TrendDown, TrendUp } from 'phosphor-svelte';

  interface Stat {
    title: string;
    value: number;
    valueUnit?: string;
    percentage?: number;
    trend: 'up' | 'down' | 'none';
    footer?: string;
  }

  const stats: Stat[] = [
    {
      title: 'Surveys created',
      value: 0,
      percentage: 0,
      trend: 'none',
    },
    {
      title: 'Survey responses this month',
      value: 10,
      percentage: 100,
      trend: 'up',
    },
    {
      title: 'Question views this month',
      value: 0,
      percentage: -100,
      trend: 'down',
    },
    {
      title: 'Question engagement rate',
      value: 0,
      valueUnit: '%',
      trend: 'none',
      footer: 'Views vs question completions',
    },
  ];
</script>

<svelte:head>
  <title>Dashboard | Survie</title>
</svelte:head>

<main>
  <Container>
    <h1 class="text-3xl font-bold">Dashboard</h1>
    <div class="grid grid-cols-4 gap-4 mt-4">
      {#each stats as stat, index (index)}
        <Card>
          <CardContent class="card-content">
            <p class="text-sm text-gray-500">{stat.title}</p>
            <p class="text-3xl font-bold my-1" style="font-family: monospace">
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
    </div>
  </Container>
</main>

<style lang="postcss">
  main {
    @apply py-12;
  }

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
