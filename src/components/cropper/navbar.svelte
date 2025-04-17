<!--suppress CssUnusedSymbol -->
<script lang="ts">
import {
  BanIcon,
  CheckIcon,
  RotateCcwIcon,
  SaveIcon,
  Trash2Icon,
  UploadIcon,
  XIcon,
} from '@lucide/svelte';
import { Button } from 'shadcn/button';
import type { Data, NavAction } from '#components/cropper/types';

type Props = {
  data: Data;
  onClose?: () => void;
  onChange?: (action: NavAction) => void;
};

let { data, onClose, onChange }: Props = $props();
</script>

<nav>
  <button type="button" class="mr-4 text-white" title="Close" aria-label="Close" onclick={onClose}>
    <XIcon class="h-6 w-6" aria-hidden="true" />
  </button>

  {#if !data.loaded}
    <label class="nav__button" for="file" title="Upload" aria-label="Upload">
      <UploadIcon aria-hidden />
    </label>
  {/if}

  {#if data.cropped}
    <Button type="button" class="nav__button no-mr" onclick={() => onChange?.('restore')}>
      <RotateCcwIcon aria-hidden="true" />
    </Button>
  {/if}

  {#if data.loaded && !data.cropping}
    <Button
      type="button"
      class="nav__button danger"
      aria-label="Remove image"
      onclick={() => onChange?.('remove')}
    >
      <Trash2Icon aria-hidden="true" />
      <span>Remove image</span>
    </Button>
  {/if}

  {#if data.loaded && data.cropped}
    <Button
      type="button"
      class="nav__button success"
      aria-label="Save changes"
      onclick={() => onChange?.('save')}
    >
      <SaveIcon aria-hidden="true" />
      <span>Save changes</span>
    </Button>
  {/if}

  {#if data.cropping}
    <Button type="button" class="nav__button warning mr-2" onclick={() => onChange?.('clear')}>
      <BanIcon aria-hidden />
      <span>Clear changes</span>
    </Button>

    <Button type="button" class="nav__button success" onclick={() => onChange?.('crop')}>
      <CheckIcon aria-hidden />
      <span>OK</span>
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
