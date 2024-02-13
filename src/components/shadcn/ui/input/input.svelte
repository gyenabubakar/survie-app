<!--suppress ReservedWordAsName -->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Eye, EyeSlash } from 'phosphor-svelte';
  import { cn } from '#components/shadcn/utils';
  import type { InputEvents } from '.';

  type $$Props = HTMLInputAttributes & {
    class?: string;
    value?: string;
    canTogglePasswordVisibility?: boolean;
  };
  type $$Events = InputEvents;

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let value: $$Props['value'] = undefined;
  export let canTogglePasswordVisibility = false;

  const inputType = $$props.type as HTMLInputAttributes['type'];
  let isPasswordInput = inputType === 'password';

  function togglePasswordVisibility(event: MouseEvent) {
    if (!canTogglePasswordVisibility) return;

    const button = event.target as HTMLButtonElement;
    const input = button
      .closest('[data-input-wrapper]')
      ?.querySelector('input') as HTMLInputElement;

    const currentType = input.getAttribute('type') as HTMLInputAttributes['type'];
    const newType = currentType === 'password' ? 'text' : 'password';

    input.setAttribute('type', newType);
    isPasswordInput = newType === 'password';
  }
</script>

{#if inputType !== 'password'}
  <input
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
{:else}
  <div data-input-wrapper class="relative">
    {#if canTogglePasswordVisibility}
      <button
        type="button"
        aria-label={isPasswordInput ? 'Hide password' : 'Show password'}
        class="absolute top-1/2 right-3 transform -translate-y-1/2"
        on:click={togglePasswordVisibility}
      >
        <svelte:component this={isPasswordInput ? Eye : EyeSlash} class="w-5 h-5" />
      </button>
    {/if}

    <input
      class={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-[15px] placeholder:text-[15px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
        canTogglePasswordVisibility && 'pr-10'
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
  </div>
{/if}

<style>
  input[type='password'],
  input[type='password']::placeholder {
    font-family: sans-serif;
  }
</style>
