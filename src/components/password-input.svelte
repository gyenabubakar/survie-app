<!-- @migration-task Error while migrating Svelte code: Cannot set properties of undefined (setting 'next') -->
<!--suppress ReservedWordAsName -->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Eye, EyeSlash } from 'phosphor-svelte';
  import { Input } from 'shadcn-ui';
  import { cn } from '#components/shadcn/utils';

  let {
    value = $bindable(undefined),
    class: className,
    ...restProps
  }: HTMLInputAttributes = $props();

  let inputElement = $state<HTMLInputElement | undefined>();

  let showingPassword = $state(false);

  function togglePasswordVisibility() {
    const currentType = inputElement!.getAttribute('type') as HTMLInputAttributes['type'];
    const newType = currentType === 'password' ? 'text' : 'password';

    inputElement!.setAttribute('type', newType);
    showingPassword = newType === 'text';
  }
</script>

<div data-input-wrapper class="relative">
  <button
    type="button"
    aria-label={showingPassword ? 'Hide password' : 'Show password'}
    class="absolute top-1/2 right-3 transform -translate-y-1/2"
    onclick={togglePasswordVisibility}
  >
    {#if showingPassword}
      <EyeSlash class="size-5" />
    {:else}
      <Eye class="size-5" />
    {/if}
  </button>

  <Input
    type="password"
    class={cn('pr-10', className)}
    bind:value
    bind:element={inputElement}
    {...restProps}
  />
</div>

<style>
  :global(input[type='password']),
  :global(input[type='password']::placeholder) {
    font-family: sans-serif;
  }
</style>
