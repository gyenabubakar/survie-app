<script lang="ts">
import { Logo } from '#components';

let { children } = $props();
</script>

<div class="layout">
  <Logo />

  {@render children?.()}
</div>

<style lang="postcss">
.layout {
  @apply mx-auto w-[340px] py-[140px];

  & :global(h1) {
    @apply mb-6 mt-4 text-2xl font-semibold;
  }
}
</style>
