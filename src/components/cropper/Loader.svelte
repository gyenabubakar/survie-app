<script lang="ts">
  import { onMount } from 'svelte';
  import type { Data } from '#components/cropper';

  const URL = window.URL ?? window.webkitURL;
  const REGEXP_MIME_TYPE_IMAGES = /^image\/\w+$/;
  const REGEXP_URLS = /^(?:https?|data):/;

  type DataProp = Omit<Data, 'cropped' | 'cropping' | 'previousUrl'>;

  export let data: DataProp;

  let element: HTMLDivElement | undefined = undefined;

  function read(file: File, event: Event | undefined = undefined): Promise<DataProp | undefined> {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(undefined);
        return;
      }

      if (REGEXP_MIME_TYPE_IMAGES.test(file.type)) {
        if (URL) {
          resolve({
            loaded: true,
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
          } as DataProp);
        } else {
          reject(new Error('Your browser is not supported.'));
        }
      } else {
        reject(new Error(`Please ${event ? event.type : 'choose'} an image file.`));
      }
    });
  }

  function change(e: Event) {
    const target = e.target as HTMLInputElement;
    const { files } = target;

    if (files && files.length > 0) {
      read(files[0])
        .then((__data) => {
          target.value = '';
          __data && update(__data);
        })
        .catch((e) => {
          target.value = '';
          alert(e);
        });
    }
  }

  function dragover(e: DragEvent) {
    e.preventDefault();
  }

  function drop(e: DragEvent) {
    e.preventDefault();

    const files = e.dataTransfer?.files;

    if (files && files.length > 0) {
      read(files[0], e)
        .then((__data) => __data && update(__data))
        .catch(alert);
    }
  }

  function paste(e: ClipboardEvent) {
    e.preventDefault();

    const { items } =
      e.clipboardData ?? (('clipboardData' in window ? window.clipboardData : {}) as DataTransfer);

    if (items && items.length > 0) {
      new Promise((resolve, reject) => {
        const item = Array.from(items).pop();
        const error = new Error('Please paste an image file or URL.');

        if (item?.kind === 'file') {
          resolve(item.getAsFile());
        } else if (item?.kind === 'string') {
          item.getAsString((url) => {
            if (REGEXP_URLS.test(url)) {
              const xhr = new XMLHttpRequest();
              const alert = () => {
                reject(error);
              };

              xhr.onabort = alert;
              xhr.onerror = alert;
              xhr.ontimeout = alert;

              xhr.onprogress = () => {
                if (!REGEXP_MIME_TYPE_IMAGES.test(xhr.getResponseHeader('content-type') ?? '')) {
                  xhr.abort();
                }
              };

              xhr.onload = () => {
                resolve(xhr.response as Blob);
              };

              xhr.open('GET', url, true);
              xhr.responseType = 'blob';
              xhr.send();
            } else {
              reject(error);
            }
          });
        } else {
          reject(error);
        }
      })
        .then((blob) => read(blob as File, e).then((__data) => __data && update(__data)))
        .catch(alert);
    }
  }

  function alert(e: Error) {
    window.alert(e && e.message ? e.message : e);
  }

  function update(newData: DataProp) {
    data = { ...data, ...newData };
  }

  onMount(() => {
    if (element) {
      element.ownerDocument.addEventListener('paste', paste);
    }

    return () => {
      if (element) {
        element.ownerDocument.removeEventListener('paste', paste);
      }
    };
  });
</script>

<div
  bind:this={element}
  class="loader"
  role="button"
  tabindex="0"
  on:dragover={dragover}
  on:drop={drop}
  on:change={change}
>
  <p>
    Paste or drop image here or
    <label class="browse">
      browse...
      <input type="file" id="file" class="sr-only" accept="image/*" />
    </label>
  </p>
</div>

<style lang="postcss">
  .loader {
    display: table;
    height: 100%;
    overflow: hidden;
    width: 100%;

    & > p {
      color: #999;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
  }

  .browse {
    color: #0074d9;
    cursor: pointer;
    margin-left: 0.25rem;

    &:hover {
      color: #08f;
      text-decoration: underline;
    }
  }
</style>
