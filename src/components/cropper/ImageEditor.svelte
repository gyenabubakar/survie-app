<script lang="ts">
  import 'cropperjs/dist/cropper.css';
  import { createEventDispatcher, onMount } from 'svelte';
  import Cropper from 'cropperjs';
  import { defaultData, type Data, type EditorToolbarAction } from '#components/cropper';
  import {
    ArrowClockwise,
    ArrowCounterClockwise,
    ArrowsHorizontal,
    ArrowsOutCardinal,
    ArrowsVertical,
    Crop,
    MagnifyingGlassMinus,
    MagnifyingGlassPlus,
  } from 'phosphor-svelte';

  const dispatch = createEventDispatcher();

  export let file: File | undefined;
  export let data: Data;
  export let cropper: Cropper | undefined = undefined;

  let canvasData: Cropper.CanvasData | null = null;
  let cropBoxData: Cropper.CropBoxData | null = null;
  let croppedData: Cropper.Data | null = null;

  let image: HTMLImageElement | undefined = undefined;

  function start() {
    if (cropper || data.cropped || !image) {
      return;
    }

    cropper = new Cropper(image, {
      autoCrop: false,
      dragMode: 'move',
      background: false,
      aspectRatio: 1,

      ready() {
        if (croppedData && canvasData && cropBoxData) {
          cropper
            ?.crop()
            ?.setData(croppedData)
            ?.setCanvasData(canvasData)
            ?.setCropBoxData(cropBoxData);

          croppedData = null;
          canvasData = null;
          cropBoxData = null;
        }
      },

      crop({ detail }) {
        if (detail.width > 0 && detail.height > 0 && !data.cropping) {
          update({
            cropping: true,
          });
        }
      },
    });
  }

  function stop() {
    cropper?.destroy();
    cropper = undefined;
  }

  export async function crop() {
    if (data.cropping && cropper) {
      croppedData = cropper.getData();
      canvasData = cropper.getCanvasData();
      cropBoxData = cropper.getCropBoxData();

      update({
        cropped: true,
        cropping: false,
        previousUrl: data.url,
        url: cropper
          .getCroppedCanvas(
            data.type === 'image/png'
              ? {}
              : {
                  fillColor: '#fff',
                }
          )
          .toDataURL(data.type),
      });

      dispatch('crop', { file: await getFileFromCropper() });

      stop();
    }
  }

  export function clear() {
    if (data.cropping) {
      cropper?.clear();
      update({
        cropping: false,
      });
    }
  }

  export function restore() {
    if (data.cropped) {
      update({
        cropped: false,
        previousUrl: '',
        url: data.previousUrl,
      });
    }
  }

  export function reset() {
    stop();
    update(defaultData);
  }

  function update(newData: Partial<Data>) {
    data = { ...data, ...newData };
  }

  export function getFileFromCropper(): Promise<File | null> {
    return new Promise<File | null>((resolve) => {
      cropper?.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const dynamicName = crypto.randomUUID() + '.' + data.type.split('/')[1];
          const name = 'edited_' + (file?.name ?? dynamicName);

          const __file = new File([blob], name, {
            lastModified: Date.now(),
            type: file?.type ?? data.type,
          });

          resolve(__file);
        }

        resolve(null);
      });
    });
  }

  function handleToolbarActionClick(action: EditorToolbarAction) {
    return () => {
      switch (action) {
        case 'move':
        case 'crop':
          cropper?.setDragMode(action);
          break;
        case 'zoom-in':
          cropper?.zoom(0.1);
          break;
        case 'zoom-out':
          cropper?.zoom(-0.1);
          break;
        case 'rotate-left':
          cropper?.rotate(-90);
          break;
        case 'rotate-right':
          cropper?.rotate(90);
          break;
        case 'flip-horizontal':
          cropper?.scaleX(-cropper?.getData?.()?.scaleX ?? -1);
          break;
        case 'flip-vertical':
          cropper?.scaleY(-cropper?.getData?.()?.scaleY ?? -1);
          break;

        default:
      }
    };
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key.toLowerCase()) {
      case 'z':
        // Undo crop
        if (e.ctrlKey) {
          e.preventDefault();
          restore();
        }
        break;
      case 'Delete':
        // Delete the image
        reset();
        break;
      default:
    }

    if (!cropper) {
      return;
    }

    switch (e.key.toLowerCase()) {
      case 'enter':
        // Crop the image
        crop();
        break;
      case 'escape':
        // Clear crop area
        clear();
        break;
      case 'arrowleft':
        // Move to the left
        e.preventDefault();
        cropper.move(-1, 0);
        break;
      case 'arrowup':
        // Move to the top
        e.preventDefault();
        cropper.move(0, -1);
        break;
      case 'arrowright':
        // Move to the right
        e.preventDefault();
        cropper.move(1, 0);
        break;
      case 'arrowdown':
        // Move to the bottom
        e.preventDefault();
        cropper.move(0, 1);
        break;
      case 'c':
        // Enter crop mode
        cropper.setDragMode('crop');
        break;
      case 'm':
        // Enter move mode
        cropper.setDragMode('move');
        break;
      case 'i':
        // Zoom in
        cropper.zoom(0.1);
        break;
      case 'o':
        // Zoom out
        cropper.zoom(-0.1);
        break;
      case 'l':
        // Rotate left
        cropper.rotate(-90);
        break;
      case 'r':
        // Rotate right
        cropper.rotate(90);
        break;
      case 'h':
        // Flip horizontal
        cropper.scaleX(-cropper.getData().scaleX || -1);
        break;
      case 'v':
        // Flip vertical
        cropper.scaleY(-cropper.getData().scaleY || -1);
        break;

      default:
    }
  }

  function handleDoubleClick(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    if (target.className.indexOf('cropper-face') >= 0) {
      e.preventDefault();
      e.stopPropagation();
      crop();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      stop();
    };
  });
</script>

<div class="editor">
  <div class="canvas" role="region" on:dblclick={handleDoubleClick}>
    <img bind:this={image} src={data.url} alt={data.name} on:loadstart={start} on:load={start} />
  </div>

  {#if cropper}
    <div class="toolbar">
      <button
        class="toolbar__button"
        title="Move (M)"
        aria-label="Move tool (M)"
        on:click={handleToolbarActionClick('move')}
      >
        <ArrowsOutCardinal weight="bold" aria-hidden="true" />
      </button>

      <button
        class="toolbar__button"
        title="Crop (C)"
        aria-label="Crop tool (C)"
        on:click={handleToolbarActionClick('crop')}
      >
        <Crop weight="bold" aria-hidden="true" />
      </button>

      <button
        class="toolbar__button"
        title="Zoom In (I)"
        aria-label="Zoom in (I)"
        on:click={handleToolbarActionClick('zoom-in')}
      >
        <MagnifyingGlassPlus weight="bold" aria-hidden="true" />
      </button>

      <button
        class="toolbar__button"
        title="Zoom Out (O)"
        aria-label="Zoom out (O)"
        on:click={handleToolbarActionClick('zoom-out')}
      >
        <MagnifyingGlassMinus weight="bold" aria-hidden="true" />
      </button>

      <button
        class="toolbar__button"
        title="Rotate Left (L)"
        aria-label="Rotate left (L)"
        on:click={handleToolbarActionClick('rotate-left')}
      >
        <ArrowCounterClockwise weight="bold" aria-hidden="true" />
      </button>

      <button
        class="toolbar__button"
        title="Rotate Right (R)"
        aria-label="Rotate right (R)"
        on:click={handleToolbarActionClick('rotate-right')}
      >
        <ArrowClockwise weight="bold" aria-hidden="true" />
      </button>

      <button
        class="toolbar__button"
        title="Flip Horizontal (H)"
        aria-label="Flip horizontal (H)"
        on:click={handleToolbarActionClick('flip-horizontal')}
      >
        <ArrowsHorizontal weight="bold" aria-hidden="true" />
      </button>

      <button
        class="toolbar__button"
        title="Flip Vertical (V)"
        aria-label="Flip vertical (V)"
        on:click={handleToolbarActionClick('flip-vertical')}
      >
        <ArrowsVertical weight="bold" aria-hidden="true" />
      </button>
    </div>
  {/if}
</div>

<style lang="postcss">
  .editor {
    height: 100%;
  }

  .canvas {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;

    & > img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .toolbar {
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 1rem;
    color: #fff;
    height: 2rem;
    left: 50%;
    margin-left: -8rem;
    position: absolute;
    width: 16rem;
    z-index: 2015;
    @apply flex;
  }

  .toolbar__button {
    @apply flex h-8 w-8 cursor-pointer items-center justify-center border-0 bg-transparent text-white;
    @apply hover:bg-white hover:text-black focus:outline-0;

    & :global(svg) {
      @apply h-4 w-4 transition-none;
    }
  }
</style>
