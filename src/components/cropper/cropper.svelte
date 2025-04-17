<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { ClassValue } from 'svelte/elements';
  import type CropperJS from 'cropperjs';
  import { defaultData } from '#components/cropper/utils';
  import type { Data, NavAction } from '#components/cropper/types';
  import ImageEditor from './image-editor.svelte';
  import Loader from './loader.svelte';
  import Navbar from './navbar.svelte';

  type Props = {
    class?: ClassValue | null;
    file: File | undefined | null;
    onClose?: (file: File | null) => void;
    onRemoveFile?: () => void;
  };

  let { class: className, file = $bindable(), onClose, onRemoveFile }: Props = $props();

  let data = $state<Data>(
    (() => {
      const data = { ...defaultData };
      if (file) {
        data.url = URL.createObjectURL(file);
        data.name = file.name;
        data.type = file.type;
        data.loaded = true;
      }
      return data;
    })()
  );

  let editor = $state<ImageEditor | undefined>();
  let cropper = $state<CropperJS | undefined>();
  let localFile = $state<File | null>(null);

  async function change(action: NavAction) {
    switch (action) {
      case 'crop':
        editor?.crop();
        break;
      case 'clear':
        editor?.clear();
        break;
      case 'restore':
        editor?.restore();
        break;
      case 'remove':
        editor?.reset();
        onRemoveFile?.();
        break;
      case 'save':
        onClose?.(localFile);
        break;
      default:
    }
  }
</script>

<div class={['cropper', className]} transition:fly={{ y: 100, duration: 300 }}>
  <header>
    <Navbar {data} onChange={change} onClose={() => onClose?.(null)} />
  </header>

  <main>
    {#if data.loaded || file}
      <ImageEditor
        bind:this={editor}
        bind:data
        bind:cropper
        {file}
        onCrop={(file) => (localFile = file)}
      />
    {:else}
      <Loader bind:data />
    {/if}
  </main>
</div>

<style lang="postcss">
  .cropper {
    @apply fixed bottom-0 left-0 right-0 top-0 z-10 h-screen w-screen;
  }

  header {
    @apply relative h-12 overflow-hidden bg-black max-md:px-4;
  }

  main {
    background-color: #333;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 3rem;
  }
</style>
