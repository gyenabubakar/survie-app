<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button, Input, Label } from 'shadcn-ui';
  import { enhance } from '$app/forms';
  import { browser } from '$app/environment';
  import { PUBLIC_DOMAIN } from '$env/static/public';
  import { companyFormFieldErrors } from '#lib/form-schemas/onboarding';
  import { FormValidationError, UrlSlugInput, UserImageInput } from '#components';
  import { Cropper } from '#components/cropper';

  export let form;

  let name = form?.data?.name ?? '';
  let slug = form?.data?.slug ?? '';
  let submitting = false;
  let formElement: HTMLFormElement | undefined;

  let fileInput: HTMLInputElement | undefined;
  let imageFile: File | undefined;
  let showImageCropper = false;

  $: nameIsValid = name ? /^[a-zA-Z0-9\s-]{3,100}$/.test(name.trim()) : null;
  $: slugIsValid = slug ? /^[a-z-]{3,50}$/.test(slug) : null;
  $: canSubmitForm = !!nameIsValid && !!slugIsValid && !submitting;

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
    <div class="form-group">
      <Label for="company-name">Company name</Label>
      <Input type="text" id="company-name" name="name" bind:value={name} required />

      {#if nameIsValid === false || !!form?.validationErrors?.name}
        {@const message = form?.validationErrors?.name ?? companyFormFieldErrors.name}
        <FormValidationError {message} />
      {/if}
    </div>

    <div class="form-group">
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
        {@const message = form?.validationErrors?.slug ?? companyFormFieldErrors.slug}
        <FormValidationError {message} />
      {/if}
    </div>

    <div class="form-group">
      <Label class="inline-block mb-4">Add your company icon (optional)</Label>
      <UserImageInput
        label="Upload your company icon."
        bind:input={fileInput}
        bind:file={imageFile}
        on:edit={() => (showImageCropper = true)}
      />

      {#if !!form?.validationErrors?.image && imageFile}
        {@const message = form?.validationErrors?.image ?? companyFormFieldErrors.image}
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
