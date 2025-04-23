<!--suppress CssUnusedSymbol -->
<script lang="ts">
import { ArrowUpRight, RocketLaunch } from 'phosphor-svelte';
import { Button } from 'shadcn/button';
import { Card } from 'shadcn/card';
import { cn } from 'shadcn/utils';
import { RecentResponse, RecentSurvey, Statistics } from '#features/dashboard/ui';
import { CreateSurveySheet, ManualSurveyForm } from '#features/surveys/ui';
import { Container } from '#components';

let { data } = $props();
</script>

<svelte:head>
  <title>Dashboard | Survie</title>
</svelte:head>

<main>
  <Container size="lg">
    <h1>Dashboard</h1>
    <Statistics stats={data.stats} />

    <section>
      <h2 class="mb-4 mt-14 text-2xl font-medium">Recent surveys</h2>
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
              <a href="/app/surveys" class="flex max-w-max items-center font-medium">
                <span>See all surveys</span>
                <ArrowUpRight weight="bold" class="ml-2" />
              </a>
            </div>
          {/if}

          <!-- Recent responses -->
          <h2 class="mb-4 mt-14 text-2xl font-medium">Recent responses</h2>

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
              <a href="/app/responses" class="flex max-w-max items-center font-medium">
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
                class="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
              >
                <RocketLaunch size="20px" />
              </div>
            </div>

            <p class="mb-1 mt-2 text-center">Create a new survey.</p>
            <p class="text-center text-sm text-gray-400">
              Click the button below and start collecting responses in minutes.
            </p>

            <div class="mt-2">
              <CreateSurveySheet>
                {#snippet children({ props })}
                  <Button class="w-full" {...props}>Create survey</Button>
                {/snippet}

                {#snippet manualForm()}
                  <ManualSurveyForm form={data.manualSurveyForm} />
                {/snippet}
              </CreateSurveySheet>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </Container>
</main>

<style lang="postcss"></style>
