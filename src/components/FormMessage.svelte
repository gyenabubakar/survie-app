<script lang="ts">
  export let variant: 'success' | 'error' = 'error';

  $: success = variant === 'success';
  $: error = variant === 'error';
</script>

<p aria-live="assertive" class:success class:error>
  <slot />
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
