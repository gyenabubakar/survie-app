<script lang="ts">
  import { Images } from 'phosphor-svelte';

  export let label: string;

  let input: HTMLInputElement | undefined;
  let files: FileList | undefined;

  $: temporaryImageURL = files && files[0] ? URL.createObjectURL(files[0]) : undefined;

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
  aria-hidden="true"
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
  </div>

  <div>
    <p>{label}</p>
    <p class="text-gray-400 text-sm">
      Square/circular images work best. Minimum 256px x 256px. JPEG/PNG.
    </p>
  </div>
</div>

<input
  bind:files
  bind:this={input}
  type="file"
  class="hidden"
  accept="image/jpeg, image/png"
  maxlength="1"
/>

<style lang="postcss">
  .user-image-input {
    @apply flex items-center;

    &:hover > .image {
      @apply bg-gray-100;
    }
  }

  .image {
    @apply mr-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-50;

    &.has-image {
      @apply bg-cover bg-center;
    }
  }
</style>
