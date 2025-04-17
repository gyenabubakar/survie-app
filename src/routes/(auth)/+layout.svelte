<script lang="ts">
  let { children } = $props();
</script>

<div class="layout">
  <a href="/" class="w-max inline-block" aria-label="Survie logo">
    <enhanced:img src="#assets/survie.svg" alt="Survie logo" width="40" height="40" />
  </a>

  {@render children?.()}
</div>

<style lang="postcss">
  .layout {
    @apply mx-auto w-[340px] py-[140px];

    & :global(h1) {
      @apply mb-6 mt-4 text-2xl font-medium;
    }
  }
</style>
