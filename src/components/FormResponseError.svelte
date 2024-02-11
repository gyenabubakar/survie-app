<script lang="ts">
  export let message: string;
</script>

<p aria-live="assertive">
  {message}
</p>

<style lang="postcss">
  p {
    @apply mb-4 rounded-md bg-red-100 p-2 text-center text-sm font-medium text-red-600;
  }
</style>
