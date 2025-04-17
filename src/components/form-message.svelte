<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    variant?: 'success' | 'error';
    children?: Snippet;
  };

  let { variant = 'error', children }: Props = $props();

  let success = $derived(variant === 'success');
  let error = $derived(variant === 'error');
</script>

<p aria-live="assertive" class:success class:error>
  {@render children?.()}
</p>

<style lang="postcss">
  p {
    @apply mb-4 rounded-md px-4 py-2 text-center text-sm font-medium;

    &.error {
      @apply bg-red-100 text-red-600;
    }

    &.success {
      @apply bg-green-100 text-green-600;
    }
  }
</style>
