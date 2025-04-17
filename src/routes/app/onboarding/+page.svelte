<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button, Input, Label } from 'shadcn-ui';
  import { enhance } from '$app/forms';
  import { PUBLIC_DOMAIN } from '$env/static/public';
  import { companyFormFieldErrors, companyFormSchema } from '#lib/form-schemas/onboarding';
  import { FormValidationError, UrlSlugInput, UserImageInput } from '#components';
  import { fieldIsValid } from '#lib/form-schemas/utils';
  import { Cropper } from '#components/cropper';

  let { form } = $props();

  let name = $state(form?.data?.name ?? '');
  let slug = $state(form?.data?.slug ?? '');
  let submitting = $state(false);
  let formElement: HTMLFormElement | undefined = $state();

  let fileInput: HTMLInputElement | undefined = $state();
  let imageFile: File | undefined = $state();
  let showImageCropper = $state(false);

  let nameIsValid = $derived(fieldIsValid(companyFormSchema, 'name', name));
  let slugIsValid = $derived(fieldIsValid(companyFormSchema, 'slug', slug));
  let canSubmitForm = $derived(!!nameIsValid && !!slugIsValid && !submitting);

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
      <UrlSlugInput id="company-slug" name="slug" bind:value={slug} required />

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
        onEdit={() => (showImageCropper = true)}
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

{#if imageFile && showImageCropper}
  <Cropper bind:file={imageFile} onClose={closeCropper} onRemoveFile={removeImageFile} />
{/if}
