<script lang="ts">
  import { onMount } from 'svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button, Input, Label } from 'shadcn-ui';
  import { enhance } from '$app/forms';
  import { browser } from '$app/environment';
  import { profileFormFieldErrors, profileFormSchema } from '#lib/form-schemas/onboarding';
  import { FormValidationError, UserImageInput } from '#components';
  import { fieldIsValid } from '#lib/form-schemas/utils';
  import type CropperComponent from '#components/cropper/Cropper.svelte';

  function loadCropper() {
    return import('#components/cropper/Cropper.svelte');
  }

  let Cropper: typeof CropperComponent | undefined;

  export let form;

  let jobTitle = form?.data?.jobTitle ?? '';
  let submitting = false;
  let formElement: HTMLFormElement | undefined;

  let fileInput: HTMLInputElement | undefined;
  let imageFile: File | undefined;
  let showImageCropper = false;

  $: jobTitleIsValid = fieldIsValid(profileFormSchema, 'jobTitle', jobTitle);
  $: canSubmitForm = !!jobTitleIsValid && !submitting;

  function closeCropper(event: CustomEvent<File>) {
    if (event.detail) imageFile = event.detail;
    showImageCropper = false;
  }

  function removeImageFile() {
    if (formElement) {
      const input = formElement.imageFile as HTMLInputElement;
      input.value = '';
      imageFile = undefined;
    }
  }

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

    return async ({ update }) => {
      await update();
      submitting = false;

      if (form?.validationErrors?.image && fileInput) {
        fileInput.value = '';
      }
    };
  };

  onMount(() => {
    console.log('Mounted!!!');
    loadCropper().then((module) => {
      Cropper = module.default;
    });
  });
</script>

<svelte:head>
  <title>User profile — Onboarding | Survie</title>
</svelte:head>

<main>
  <h1>Now, let's get some basic info about you.</h1>
  <p class="description">
    We need your job title and profile picture to show with any surveys you create.
  </p>

  <form
    bind:this={formElement}
    method="post"
    autocomplete="off"
    enctype="multipart/form-data"
    use:enhance={submit}
  >
    <div class="form-group">
      <Label for="company-name">Job title</Label>
      <Input type="text" id="job-title" name="jobTitle" bind:value={jobTitle} required />

      {#if jobTitleIsValid === false || !!form?.validationErrors?.jobTitle}
        {@const message = form?.validationErrors?.jobTitle ?? profileFormFieldErrors.jobTitle}
        <FormValidationError {message} />
      {/if}
    </div>

    <div class="form-group">
      <Label class="inline-block mb-4">Add your profile picture (optional)</Label>
      <UserImageInput
        label="Upload your profile picture"
        bind:input={fileInput}
        bind:file={imageFile}
        on:edit={() => (showImageCropper = true)}
      />

      {#if !!form?.validationErrors?.image && imageFile}
        {@const message = form?.validationErrors?.image ?? profileFormFieldErrors.image}
        <FormValidationError {message} />
      {/if}
    </div>

    <Button
      type="submit"
      class="relative mt-4"
      style="width: max-content;"
      disabled={!canSubmitForm}
      loading={submitting}
      aria-label={submitting ? 'Saving, please wait' : 'Continue'}
    >
      Continue
    </Button>
  </form>
</main>

{#if browser && imageFile && showImageCropper}
  <Cropper bind:file={imageFile} on:close={closeCropper} on:remove-file={removeImageFile} />
{/if}
