<!--suppress ReservedWordAsName -->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Eye, EyeSlash } from 'phosphor-svelte';
  import { cn } from '#components/shadcn/utils';
  import type { InputEvents } from '.';

  type $$Props = HTMLInputAttributes & {
    class?: string;
    value?: string;
    element?: HTMLInputElement | undefined;
  };
  type $$Events = InputEvents;

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let value: $$Props['value'] = undefined;
  export let element: HTMLInputElement | undefined = undefined;
</script>

<input
  bind:this={element}
  class={cn(
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-[15px] placeholder:text-[15px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    className
  )}
  bind:value
  on:blur
  on:change
  on:click
  on:focus
  on:focusin
  on:focusout
  on:keydown
  on:keypress
  on:keyup
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:paste
  on:input
  {...$$restProps}
/>
