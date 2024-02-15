<script lang="ts">
  import { Images } from 'phosphor-svelte';

  export let label: string;
  export let input: HTMLInputElement | undefined = undefined;

  let file: File | undefined;

  $: temporaryImageURL = file ? URL.createObjectURL(file) : undefined;

  function handleInputChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!file) {
      file = target.files?.[0];
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
      Square/circular images work best. JPEG/PNG only. Maximum 2MB.
    </p>
  </div>
</div>

<input
  bind:this={input}
  name="image"
  type="file"
  class="hidden"
  accept="image/jpeg, image/png"
  maxlength="1"
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
    @apply mr-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-50;

    &.has-image {
      @apply bg-cover bg-center;
    }
  }
</style>
