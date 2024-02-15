<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { PUBLIC_DOMAIN } from '$env/static/public';
  import { Button, Input, Label } from '#shadcn-ui';
  import { Container, Loading, UrlSlugInput, UserImageInput } from '#components';

  let slug = '';
  let submitting = false;

  $: slugIsInvalid = slug.length > 0 && !/^[a-z-]{3,50}$/.test(slug);

  const submit: SubmitFunction = ({ cancel }) => {
    if (submitting) return cancel();
    submitting = true;

    return async ({ update }) => {
      await update();
      submitting = false;
    };
  };
</script>

<svelte:head>
  <title>Company info — Onboarding | Survie</title>
</svelte:head>

<main>
  <Container size="sm">
    <h1>Let's confirm your company info.</h1>
    <p class="description">We just need some basic company info from you to get started.</p>

    <form method="post" autocomplete="off" use:enhance={submit}>
      <div class="form-field">
        <Label for="company-name">Company name</Label>
        <Input type="text" id="company-name" name="name" required />
      </div>

      <div class="form-field">
        <Label for="company-slug">URL slug</Label>
        <UrlSlugInput
          id="company-slug"
          name="slug"
          bind:value={slug}
          domain={PUBLIC_DOMAIN}
          required
        />

        {#if slug && !slugIsInvalid}
          <span class="text-sm text-gray-400">
            Your company's URL will be <strong>
              {PUBLIC_DOMAIN}/<span class="text-black">{slug}</span>
            </strong>
          </span>
        {/if}

        {#if slugIsInvalid}
          <p class="text-red-500 text-sm mt-0.5">
            Only small letters and hyphens are allowed. Must be between 3 and 50 characters.
          </p>
        {/if}
      </div>

      <div class="form-field">
        <Label class="inline-block mb-4">Add your company icon (optional)</Label>
        <UserImageInput label="Upload your company icon" />
      </div>

      <Button type="submit" class="relative mt-4" style="width: max-content;">
        <span class:invisible={submitting}>Continue</span>
        {#if submitting}
          <Loading size="23px" aria-hidden="true" class="absolute" />
        {/if}
      </Button>
    </form>
  </Container>
</main>
