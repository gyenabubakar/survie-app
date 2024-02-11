<script lang="ts"></script>

<div class="layout">
  <a href="/">
    <enhanced:img src="#assets/survie.svg" alt="Survie logo" width="40" height="40" />
  </a>

  <slot />
</div>

<style lang="postcss">
  .layout {
    @apply mx-auto w-[340px] py-[120px];

    & :global(h1) {
      @apply mb-6 mt-5 text-2xl font-medium;
    }
  }

  :global(.layout form) {
    & :global(label) {
      @apply text-base font-normal;
    }
    & :global(input::placeholder) {
      @apply text-[15px];
    }
    & :global(button[type='submit']) {
      @apply w-full;
    }
  }
</style>
