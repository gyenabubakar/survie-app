<script lang="ts">
import { page } from '$app/state';
import { Badge } from 'shadcn/badge';
import { Button } from 'shadcn/button';
import { Container, OptionsButton } from '#components';
</script>

<svelte:head>
  <title>New Feature Survey | Survie</title>
</svelte:head>

<section class="relative bg-white py-14 shadow-xl shadow-slate-100">
  <OptionsButton class="absolute right-6 top-6" />

  <Container size="lg">
    <Badge variant="secondary">Draft</Badge>

    <h1 class="mb-1 mt-3 font-medium">New Feature Survey</h1>

    <p class="text-gray-500/80">
      This survey is designed to collect feedback on a new feature recently added to the site.
      Through the survey, we aim to understand users' experience with the new feature and gather
      their opinions on how the feature could be improved. The survey will provide website
      developers with valuable insights on how to best optimize the feature for users.
    </p>

    <Button class="mt-3 border border-green-200 bg-green-50 text-green-600 hover:bg-green-100/70">
      Enable survey
    </Button>
  </Container>
</section>

<section>
  <Container size="lg">
    <div class="py-32 text-center">
      <h4 class="text-xl font-medium">Let's add some questions to your survey.</h4>
      <p class="text-sm text-gray-500">
        Click on the button below to get your survey up and running.
      </p>
      <a href="/app/surveys/{page.params.surveyID}/question">
        <Button class="mt-3">Add a question</Button>
      </a>
    </div>
  </Container>
</section>

<style lang="postcss">
:global(main#page-wrapper) {
  @apply pt-0;
}
</style>
