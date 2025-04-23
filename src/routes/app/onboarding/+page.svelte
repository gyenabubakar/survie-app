<script lang="ts">
import { zodClient } from 'sveltekit-superforms/adapters';
import { PUBLIC_DOMAIN } from '$env/static/public';
import * as Form from 'shadcn/form';
import { Input } from 'shadcn/input';
import { companyFormSchema } from '#features/onboarding/schemas';
import { Button } from '#components';
import { Cropper } from '#components/cropper';
import { FormFieldErrors, UrlSlugInput, UserImageInput } from '#components/forms';
import { SUPER_FORM_COMMON_OPTIONS } from '#lib/constants';
import { createSuperForm } from '#lib/forms';

let { data } = $props();

const superForm = createSuperForm(data.form, {
  validators: zodClient(companyFormSchema),
  ...SUPER_FORM_COMMON_OPTIONS,
  dataType: 'form',
});

const { form, submitting, enhance } = superForm;

const isValidForm = $derived(companyFormSchema.safeParse($form).success);

let fileInput: HTMLInputElement | undefined = $state();
let imageFile: File | undefined = $state();
let showImageCropper = $state(false);

function closeCropper(file: File | null) {
  if (file) imageFile = file;
  showImageCropper = false;
}

function removeImageFile() {
  if (!fileInput) return;
  fileInput.value = '';
  imageFile = undefined;
}
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
    method="post"
    autocomplete="off"
    enctype="multipart/form-data"
    use:enhance
    class="grid gap-3"
  >
    <Form.Field form={superForm} name="name">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Company name</Form.Label>
          <Input {...props} bind:value={$form.name} />
        {/snippet}
      </Form.Control>
      <FormFieldErrors />
    </Form.Field>

    <Form.Field form={superForm} name="slug" data-company-slug>
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>URL slug</Form.Label>
          <UrlSlugInput {...props} bind:value={$form.slug} />
        {/snippet}
      </Form.Control>

      <FormFieldErrors>
        <span class="text-sm text-gray-400">
          Your company's URL will be <strong>
            {PUBLIC_DOMAIN}/@<span class="text-black">{$form.slug}</span>
          </strong>
        </span>
      </FormFieldErrors>
    </Form.Field>

    <Form.Field form={superForm} name="image">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label class="inline-block">Add your company icon (optional)</Form.Label>
          <UserImageInput
            {...props}
            label="Upload your company icon."
            bind:ref={fileInput}
            bind:file={imageFile}
            onEdit={() => (showImageCropper = true)}
          />
        {/snippet}
      </Form.Control>
      <FormFieldErrors />
    </Form.Field>

    <Button
      type="submit"
      class="relative mt-4"
      style="width: max-content;"
      disabled={!isValidForm}
      loading={$submitting}
      aria-label={$submitting ? 'Saving, please wait' : 'Continue'}
    >
      Continue
    </Button>
  </form>
</main>

{#if imageFile && showImageCropper}
  <Cropper bind:file={imageFile} onClose={closeCropper} onRemoveFile={removeImageFile} />
{/if}

<style lang="postcss">
:global([data-company-slug] [data-fs-field-errors]) {
  @apply !mt-1;
}
</style>
