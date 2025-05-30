<script lang="ts">
import { zodClient } from 'sveltekit-superforms/adapters';
import * as Form from 'shadcn/form';
import { Input } from 'shadcn/input';
import { profileSchema } from '#features/onboarding/schemas';
import { Button } from '#components';
import { Cropper } from '#components/cropper';
import { FormFieldErrors, UserImageInput } from '#components/forms';
import { SUPER_FORM_COMMON_OPTIONS } from '#lib/constants';
import { createSuperForm } from '#lib/forms';

let { data } = $props();

const superForm = createSuperForm(data.form, {
  validators: zodClient(profileSchema),
  ...SUPER_FORM_COMMON_OPTIONS,
  dataType: 'form',
});

const { form, submitting, enhance } = superForm;

const isValidForm = $derived(profileSchema.safeParse($form).success);

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
  <title>User profile — Onboarding | Survie</title>
</svelte:head>

<main>
  <h1>Now, let's get some basic info about you.</h1>
  <p class="description">
    We need your job title and profile picture to show with any surveys you create.
  </p>

  <form
    method="post"
    autocomplete="off"
    enctype="multipart/form-data"
    use:enhance
    class="grid gap-3"
  >
    <Form.Field form={superForm} name="jobTitle">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Job title</Form.Label>
          <Input {...props} bind:value={$form.jobTitle} />
        {/snippet}
      </Form.Control>
      <FormFieldErrors />
    </Form.Field>

    <Form.Field form={superForm} name="image">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label class="inline-block">Add your profile picture (optional)</Form.Label>
          <UserImageInput
            {...props}
            label="Upload your profile picture."
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
