<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { browser } from '$app/environment';
  import { PUBLIC_DOMAIN } from '$env/static/public';
  import { formFieldErrors } from '$lib/form-schemas/company-info';
  import { Button, Input, Label } from '#shadcn-ui';
  import { FormValidationError, Loading, UrlSlugInput, UserImageInput } from '#components';
  import { Cropper } from '#components/cropper';

  export let form;

  let name = form?.data?.name ?? '';
  let slug = form?.data?.slug ?? '';
  let submitting = false;
  let formElement: HTMLFormElement | undefined;

  let fileInput: HTMLInputElement | undefined;
  let imageFile: File | undefined;
  let showImageCropper = false;

  $: nameIsValid = name ? /^[a-zA-Z0-9\s-]{3,100}$/.test(name) : null;
  $: slugIsValid = slug ? /^[a-z-]{3,50}$/.test(slug) : null;
  $: canSubmitForm = !!nameIsValid && !!slugIsValid && !submitting;

  $: console.log('imageFile:', imageFile);

  const submit: SubmitFunction = ({ cancel, formData }) => {
    if (!canSubmitForm) return cancel();
    submitting = true;

    if (form?.validationErrors) form.validationErrors = null;

    const file = formData.get('image') as File;

    if (file instanceof File) {
      if (file.size === 0) {
        formData.delete('image');
      } else if (imageFile) {
        formData.set('image', imageFile);
      }
    }

    console.log('submit:', formData.get('image'));

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
  <h1>Let's confirm your company info.</h1>
  <p class="description">
    We just need some basic company info from you to get started. You can set this up for your own
    personal use.
  </p>

  <form
    bind:this={formElement}
    method="post"
    autocomplete="off"
    enctype="multipart/form-data"
    use:enhance={submit}
  >
    <div class="form-field">
      <Label for="company-name">Company name</Label>
      <Input type="text" id="company-name" name="name" bind:value={name} required />

      {#if nameIsValid === false || !!form?.validationErrors?.name}
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

      {#if slugIsValid}
        <span class="text-sm text-gray-400">
          Your company's URL will be <strong>
            {PUBLIC_DOMAIN}/@<span class="text-black">{slug}</span>
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
        on:edit={() => (showImageCropper = true)}
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
      aria-live="polite"
      aria-label={submitting ? 'Saving, please wait' : 'Continue'}
    >
      <span class:invisible={submitting}>Continue</span>
      {#if submitting}
        <Loading size="23px" aria-hidden="true" class="absolute" />
      {/if}
    </Button>
  </form>
</main>

{#if browser && imageFile && showImageCropper}
  <Cropper
    bind:file={imageFile}
    on:close={({ detail }) => {
      if (detail) imageFile = detail;
      showImageCropper = false;
    }}
  />
{/if}

<!--<ImageCropperModal />-->
