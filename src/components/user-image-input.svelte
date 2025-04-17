<!--suppress JSDeprecatedSymbols -->
<script lang="ts">
import { preventDefault, stopPropagation } from 'svelte/legacy';
import { Images, PencilSimple } from 'phosphor-svelte';
import { toast } from 'svelte-sonner';
import { isSupportedImageFile } from '#lib';

type Props = {
  label: string;
  input?: HTMLInputElement | undefined;
  file?: File | undefined;
  onEdit?: (file: File | undefined) => unknown | Promise<unknown>;
};

let { label, input = $bindable(undefined), file = $bindable(undefined), onEdit }: Props = $props();

let temporaryImageURL = $derived(file ? URL.createObjectURL(file) : undefined);

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

function handleKeyUp(e: Event) {
  const event = e as KeyboardEvent;
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
  onkeydown={preventDefault(handleKeyUp)}
  onclick={() => input?.click()}
>
  <div
    class="image"
    class:has-image={!!temporaryImageURL}
    style:background-image={temporaryImageURL ? `url(${temporaryImageURL})` : undefined}
  >
    {#if !temporaryImageURL}
      <Images class="h-6 w-6 text-gray-400" />
    {/if}

    {#if temporaryImageURL}
      <button
        type="button"
        title="Edit image"
        class="absolute -right-1 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-white"
        onclickcapture={stopPropagation(() => onEdit?.(file))}
      >
        <PencilSimple weight="fill" />
      </button>
    {/if}
  </div>

  <div>
    <p>{label}</p>
    <p class="text-sm text-gray-400">
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
  onchange={handleInputChanged}
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
