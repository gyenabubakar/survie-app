<script lang="ts">
import { browser } from '$app/environment';
import { enhance } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';
import { Button } from 'shadcn/button';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { FormValidationError, UserImageInput } from '#components';
import { Cropper } from '#components/cropper';
import { profileFormFieldErrors, profileFormSchema } from '#lib/form-schemas/onboarding';
import { fieldIsValid } from '#lib/form-schemas/utils';

let { form } = $props();

let jobTitle = $state(form?.data?.jobTitle ?? '');
let submitting = $state(false);
let formElement: HTMLFormElement | undefined = $state();

let fileInput: HTMLInputElement | undefined = $state();
let imageFile: File | undefined = $state();
let showImageCropper = $state(false);

let jobTitleIsValid = $derived(fieldIsValid(profileFormSchema, 'jobTitle', jobTitle));
let canSubmitForm = $derived(!!jobTitleIsValid && !submitting);

function closeCropper(file: File | null) {
  if (file) imageFile = file;
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
      <Label class="mb-4 inline-block">Add your profile picture (optional)</Label>
      <UserImageInput
        label="Upload your profile picture"
        bind:input={fileInput}
        bind:file={imageFile}
        onEdit={() => (showImageCropper = true)}
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
  <Cropper bind:file={imageFile} onClose={closeCropper} onRemoveFile={removeImageFile} />
{/if}
