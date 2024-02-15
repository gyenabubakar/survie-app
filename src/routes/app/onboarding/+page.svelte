<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { PUBLIC_DOMAIN } from '$env/static/public';
  import { formFieldErrors } from '$lib/form-schemas/company-info';
  import { Button, Input, Label } from '#shadcn-ui';
  import {
    Container,
    FormValidationError,
    Loading,
    UrlSlugInput,
    UserImageInput,
  } from '#components';

  export let form;

  let name = form?.data?.name ?? '';
  let slug = form?.data?.slug ?? '';
  let submitting = false;

  let fileInput: HTMLInputElement | undefined;
  let imageFile: File | undefined;

  $: nameIsInvalid = name.length > 0 ? /^[a-zA-Z0-9\s-]{3,100}$/.test(name) : null;
  $: slugIsValid = slug.length > 0 ? /^[a-z-]{3,50}$/.test(slug) : null;
  $: canSubmitForm = nameIsInvalid === true && slugIsValid === true && !submitting;

  const submit: SubmitFunction = ({ cancel, formData }) => {
    if (!canSubmitForm) return cancel();

    submitting = true;
    const file = formData.get('image') as File;

    if (file instanceof File && file.size === 0) {
      formData.delete('image');
    }

    return async ({ update }) => {
      await update();
      submitting = false;

      if (form?.validationErrors?.image && fileInput) {
        fileInput.value = '';
      }
    };
  };
</script>

<svelte:head>
  <title>Company info — Onboarding | Survie</title>
</svelte:head>

<main>
  <Container size="sm">
    <h1>Let's confirm your company info.</h1>
    <p class="description">
      We just need some basic company info from you to get started. You can set this up for your own
      personal use.
    </p>

    <form method="post" autocomplete="off" enctype="multipart/form-data" use:enhance={submit}>
      <div class="form-field">
        <Label for="company-name">Company name</Label>
        <Input type="text" id="company-name" name="name" bind:value={name} required />

        {#if nameIsInvalid === false || !!form?.validationErrors?.name}
          {@const message = form?.validationErrors?.name ?? formFieldErrors.name}
          <FormValidationError {message} />
        {/if}
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

        {#if (slug && slugIsValid) || !!form?.validationErrors?.slug}
          <span class="text-sm text-gray-400">
            Your company's URL will be <strong>
              {PUBLIC_DOMAIN}/<span class="text-black">{slug}</span>
            </strong>
          </span>
        {/if}

        {#if slugIsValid === false || !!form?.validationErrors?.slug}
          {@const message = form?.validationErrors?.slug ?? formFieldErrors.slug}
          <FormValidationError {message} />
        {/if}
      </div>

      <div class="form-field">
        <Label class="inline-block mb-4">Add your company icon (optional)</Label>
        <UserImageInput
          label="Upload your company icon."
          bind:input={fileInput}
          bind:file={imageFile}
        />

        {#if !!form?.validationErrors?.image && imageFile}
          {@const message = form?.validationErrors?.image ?? formFieldErrors.image}
          <FormValidationError {message} />
        {/if}
      </div>

      <Button
        type="submit"
        class="relative mt-4"
        style="width: max-content;"
        disabled={!canSubmitForm}
      >
        <span class:invisible={submitting}>Continue</span>
        {#if submitting}
          <Loading size="23px" aria-hidden="true" class="absolute" />
        {/if}
      </Button>
    </form>
  </Container>
</main>
