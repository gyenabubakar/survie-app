<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import type Cropper from 'cropperjs';
  import {
    Navbar,
    Loader,
    ImageEditor,
    defaultData,
    type Data,
    type NavAction,
  } from '#components/cropper';

  const dispatch = createEventDispatcher();

  export let file: File | undefined;

  let data: Data = { ...defaultData };
  let editor: ImageEditor | undefined = undefined;
  let cropper: Cropper | undefined = undefined;

  let localFile: File | null = null;

  if (file) {
    data.url = URL.createObjectURL(file);
    data.name = file.name;
    data.type = file.type;
    data.loaded = true;
  }

  function crop(e: CustomEvent<{ file: File | null }>) {
    localFile = e.detail.file;
  }

  async function change(e: CustomEvent<NavAction>) {
    switch (e.detail) {
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
        dispatch('remove-file');
        break;
      case 'save':
        dispatch('close', localFile);
        break;
      default:
    }
  }
</script>

<div class="cropper" transition:fly={{ y: 100, duration: 300 }}>
  <header>
    <Navbar {data} on:change={change} on:close />
  </header>

  <main>
    {#if data.loaded || file}
      <ImageEditor bind:this={editor} bind:data bind:cropper {file} on:crop={crop} />
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
