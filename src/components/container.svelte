<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type SizeType = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  type Props = HTMLAttributes<HTMLDivElement> & {
    size?: SizeType;
  };

  let { children, class: className, size = 'sm' }: Props = $props();
</script>

<div
  class={['sv-container', className]}
  class:sm={size === 'sm'}
  class:md={size === 'md'}
  class:lg={size === 'lg'}
  class:xl={size === 'xl'}
  class:xxl={size === '2xl'}
>
  {@render children?.()}
</div>

<style lang="postcss">
  .sv-container {
    @apply mx-auto my-0 px-4;

    &.sm {
      max-width: 560px;
    }

    &.md {
      max-width: 768px;
    }

    &.lg {
      max-width: 1024px;
    }

    &.xl {
      max-width: 1280px;
    }

    &.xxl {
      max-width: 1536px;
    }
  }
</style>
