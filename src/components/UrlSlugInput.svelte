<!--suppress JSUnusedGlobalSymbols -->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { PUBLIC_DOMAIN } from '$env/static/public';

  type $$Props = HTMLInputAttributes;

  export let value = '';

  let input: HTMLInputElement | undefined;

  function handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'INPUT') {
      input?.focus();
    }
  }
</script>

<div
  class="input-wrapper"
  role="textbox"
  tabindex="0"
  on:click={handleClick}
  on:keydown|self={() => input?.focus()}
>
  <span>{PUBLIC_DOMAIN}/@</span>
  <input bind:this={input} bind:value type="text" {...$$restProps} />
</div>

<style lang="postcss">
  .input-wrapper {
    @apply relative flex h-9 w-full overflow-hidden rounded-md border border-input bg-transparent text-base;
    @apply shadow-sm transition-colors placeholder:text-base placeholder:text-muted-foreground;
    @apply focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50;

    &:has(input:focus-visible) {
      @apply ring-1 ring-ring;
    }

    & span {
      @apply pointer-events-none flex w-max items-center pl-3 text-gray-400;
    }

    & input {
      @apply w-full flex-1 pl-1 pr-3 outline-0;
    }
  }
</style>
