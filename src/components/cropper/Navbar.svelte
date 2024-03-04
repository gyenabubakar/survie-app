<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {
    ArrowCounterClockwise,
    Check,
    FloppyDisk,
    Prohibit,
    Trash,
    Upload,
    X,
  } from 'phosphor-svelte';
  import type { Data, NavAction } from '#components/cropper';
  import { Button } from 'shadcn-ui';

  const dispatch = createEventDispatcher();

  export let data: Data;

  function dispatchChange(action: NavAction) {
    return () => dispatch('change', action);
  }
</script>

<nav>
  <button
    type="button"
    class="text-white mr-4"
    title="Close"
    aria-label="Close"
    on:click={() => dispatch('close')}
  >
    <X class="w-6 h-6" aria-hidden="true" />
  </button>

  {#if !data.loaded}
    <label class="nav__button" for="file" title="Upload" aria-label="Upload">
      <Upload aria-hidden />
    </label>
  {/if}

  {#if data.cropped}
    <Button
      type="button"
      class="nav__button no-mr"
      title="Undo (Ctrl + Z)"
      on:click={dispatchChange('restore')}
    >
      <ArrowCounterClockwise aria-hidden="true" />
    </Button>
  {/if}

  {#if data.loaded && !data.cropping}
    <Button
      type="button"
      class="nav__button danger"
      title="Remove image (Delete)"
      aria-label="Remove image"
      on:click={dispatchChange('remove')}
    >
      <Trash aria-hidden="true" />
      <span>Remove image</span>
    </Button>
  {/if}

  {#if data.loaded && data.cropped}
    <Button
      type="button"
      class="nav__button success"
      title="Save changes (Ctrl + Enter)"
      aria-label="Save changes"
      on:click={dispatchChange('save')}
    >
      <FloppyDisk aria-hidden="true" />
      <span>Save changes</span>
    </Button>
  {/if}

  {#if data.cropping}
    <Button
      type="button"
      class="nav__button warning mr-2"
      title="Clear changes (Esc)"
      on:click={dispatchChange('clear')}
    >
      <Prohibit aria-hidden />
      <span>Clear changes</span>
    </Button>

    <Button
      type="button"
      class="nav__button success"
      title="OK (Enter)"
      on:click={dispatchChange('crop')}
    >
      <Check aria-hidden />
      <span>Crop</span>
    </Button>
  {/if}
</nav>

<style lang="postcss">
  nav {
    @apply flex h-full items-center px-6;
  }

  :global(.nav__button) {
    @apply mr-3 flex items-center;

    & span {
      @apply text-lg;
    }
  }

  :global(.nav__button.danger) {
    @apply bg-red-600 hover:bg-red-700;
  }

  :global(.nav__button.warning) {
    @apply bg-yellow-600 hover:bg-yellow-700;
  }

  :global(.nav__button.success) {
    @apply bg-green-600 hover:bg-green-700;
  }

  :global(.nav__button svg) {
    @apply h-5 w-5 transition-none;
  }
  :global(.nav__button:not(.no-mr) svg) {
    @apply mr-2;
  }
</style>
