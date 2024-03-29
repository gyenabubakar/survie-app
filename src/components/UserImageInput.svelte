<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Images, PencilSimple } from 'phosphor-svelte';
  import { toast } from 'svelte-sonner';
  import { isSupportedImageFile } from '#lib';

  const dispatch = createEventDispatcher();

  export let label: string;
  export let input: HTMLInputElement | undefined = undefined;
  export let file: File | undefined = undefined;

  $: temporaryImageURL = file ? URL.createObjectURL(file) : undefined;

  function handleInputChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];

    if (selectedFile) {
      if (isSupportedImageFile(selectedFile)) {
        file = selectedFile;
      } else {
        toast.error('Invalid file type.', {
          description: "Please select a JPEG/PNG file that's less than 2MB in size.",
          position: 'top-right',
        });
      }
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (['Enter', ' '].includes(event.key)) {
      input?.click();
    }
  }
</script>

<div
  class="user-image-input"
  role="button"
  tabindex="0"
  aria-label="Upload a new image."
  on:keydown|preventDefault={handleKeyUp}
  on:click={() => input?.click()}
>
  <div
    class="image"
    class:has-image={!!temporaryImageURL}
    style:background-image={temporaryImageURL ? `url(${temporaryImageURL})` : undefined}
  >
    {#if !temporaryImageURL}
      <Images class="w-6 h-6 text-gray-400" />
    {/if}

    {#if temporaryImageURL}
      <button
        type="button"
        title="Edit image"
        class="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center absolute -right-1 top-0"
        on:click|stopPropagation|capture={() => dispatch('edit', { file })}
      >
        <PencilSimple weight="fill" />
      </button>
    {/if}
  </div>

  <div>
    <p>{label}</p>
    <p class="text-gray-400 text-sm">
      Square/circular images work best. JPEG/PNG only. Maximum 2MB.
    </p>
  </div>
</div>

<input
  bind:this={input}
  id="imageFile"
  name="image"
  type="file"
  class="hidden"
  accept="image/jpeg, image/png"
  maxlength="1"
  aria-hidden="true"
  on:change={handleInputChanged}
/>

<style lang="postcss">
  .user-image-input {
    @apply flex items-center;

    &:hover > .image {
      @apply bg-gray-100;
    }
  }

  .image {
    @apply relative mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50;

    &.has-image {
      @apply bg-cover bg-center;
    }
  }
</style>
