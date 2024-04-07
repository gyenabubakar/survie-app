<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import { Badge } from 'shadcn-ui/badge';
  import { Button } from 'shadcn-ui';
  import { Container, OptionsButton } from '#components';
</script>

<svelte:head>
  <title>New Feature Survey | Survie</title>
</svelte:head>

<main>
  <section class="header">
    <Container size="2xl" class="flex justify-end">
      <OptionsButton class="absolute top-6 right-6" />
    </Container>

    <Container size="lg">
      <Badge variant="secondary">Draft</Badge>
      <h1 class="mt-3 mb-1 font-medium">New Feature Survey</h1>
      <p class="text-gray-500/80">
        This survey is designed to collect feedback on a new feature recently added to the site.
        Through the survey, we aim to understand users' experience with the new feature and gather
        their opinions on how the feature could be improved. The survey will provide website
        developers with valuable insights on how to best optimize the feature for users.
      </p>
      <Button id="enable-survey-btn" class="mt-3">Enable survey</Button>
    </Container>
  </section>

  <section>
    <Container size="lg">
      <div class="text-center py-32">
        <h4 class="text-xl font-medium">Let's add some questions to your survey.</h4>
        <p class="text-sm text-gray-500">
          Click on the button below to get your survey up and running.
        </p>
        <Button class="mt-3">Add a question</Button>
      </div>
    </Container>
  </section>
</main>

<style lang="postcss">
  main {
    @apply pt-0;

    .header {
      @apply relative bg-white py-14 shadow-xl shadow-slate-100;

      :global(#enable-survey-btn) {
        @apply border border-green-200 bg-green-50 text-green-600;
      }
    }
  }
</style>
