<script lang="ts"></script>

<div class="layout">
  <a href="/">
    <enhanced:img src="../../assets/survie.svg" alt="Survie logo" width="40" height="40" />
  </a>

  <slot />
</div>

<style lang="postcss">
  .layout {
    @apply w-[340px] mx-auto py-[120px];

    & :global(h1) {
      @apply text-2xl font-medium mt-5 mb-6;
    }
  }

  :global(.layout form) {
    & :global(label) {
      @apply font-normal text-base;
    }
    & :global(input::placeholder) {
      @apply text-[15px];
    }
    & :global(button[type='submit']) {
      @apply w-full;
    }
  }
</style>
