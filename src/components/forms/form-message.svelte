<script lang="ts">
import type { Snippet } from 'svelte';

type Props = {
  variant?: 'success' | 'error';
  children?: Snippet;
};

let { variant = 'error', children }: Props = $props();
</script>

<p aria-live="assertive" class:success={variant === 'success'} class:error={variant === 'error'}>
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
