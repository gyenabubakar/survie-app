<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import { Logo, Container } from '#components';
</script>

<div class="layout">
  <nav class="py-8">
    <Container size="2xl">
      <Logo />
    </Container>
  </nav>

  <slot />
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
