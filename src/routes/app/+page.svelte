<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import { ArrowUpRight, RocketLaunch } from 'phosphor-svelte';
  import { Button } from 'shadcn-ui';
  import { Card } from 'shadcn-ui/card';
  import { cn } from '#components/shadcn/utils';
  import { Container } from '#components';
  import {
    CreateSurveySheet,
    ManualSurveyForm,
    RecentResponse,
    RecentSurvey,
    Statistics,
  } from '#components/dashboard';

  export let data;
</script>

<svelte:head>
  <title>Dashboard | Survie</title>
</svelte:head>

<main>
  <Container size="lg">
    <h1>Dashboard</h1>
    <Statistics stats={data.stats} />

    <section>
      <h2 class="text-2xl font-medium mb-4 mt-14">Recent surveys</h2>
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-2">
          <Card class={cn(data.recentSurveys.length ? 'h-auto' : 'h-[130px]')}>
            {#each data.recentSurveys as survey (survey.id)}
              <RecentSurvey {...survey} />
            {:else}
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                <span>You haven't created any surveys yet.</span>
              </div>
            {/each}
          </Card>

          {#if data.recentSurveys.length}
            <div class="mt-4">
              <a href="/app/surveys" class="flex items-center font-medium max-w-max">
                <span>See all surveys</span>
                <ArrowUpRight weight="bold" class="ml-2" />
              </a>
            </div>
          {/if}

          <!-- Recent responses -->
          <h2 class="text-2xl font-medium mb-4 mt-14">Recent responses</h2>
          <Card class={cn(data.recentSurveys.length ? 'h-auto' : 'h-[130px]')}>
            {#each data.recentResponses as response (response.id)}
              <RecentResponse {...response} />
            {:else}
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                <span>You haven't received any responses yet.</span>
              </div>
            {/each}
          </Card>

          {#if data.recentSurveys.length}
            <div class="mt-4">
              <a href="/app/responses" class="flex items-center font-medium max-w-max">
                <span>See all responses</span>
                <ArrowUpRight weight="bold" class="ml-2" />
              </a>
            </div>
          {/if}
        </div>

        <div>
          <Card class="p-6">
            <div class="flex justify-center">
              <div
                class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
              >
                <RocketLaunch size="20px" />
              </div>
            </div>
            <p class="text-center mt-2 mb-1">Create a new survey.</p>
            <p class="text-center text-sm text-gray-400">
              Click the button below and start collecting responses in minutes.
            </p>
            <div class="mt-2">
              <CreateSurveySheet let:builders>
                <Button class="w-full" {builders}>Create survey</Button>

                <ManualSurveyForm slot="manual-form" />
              </CreateSurveySheet>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </Container>
</main>

<style lang="postcss"></style>
