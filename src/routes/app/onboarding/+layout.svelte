<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import { Logo, Container } from '#components';
</script>

<div class="layout">
  <Container size="sm" class="pt-[140px]">
    <Logo />
    <slot />
  </Container>
</div>

<style lang="postcss">
  .layout {
    & :global(h1) {
      @apply mb-1 mt-4 text-2xl font-medium;
    }
    & :global(p.description) {
      @apply mb-6 text-gray-500;
    }
  }

  :global(.layout > main) {
    @apply pt-[100px];
  }
</style>
