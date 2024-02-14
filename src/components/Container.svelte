<!--suppress JSUnusedGlobalSymbols, CssUnusedSymbol, ReservedWordAsName -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#components/shadcn/utils';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = HTMLAttributes<HTMLDivElement> & {
    wider?: boolean;
    class?: string;
  };

  let className: string | undefined = undefined;
  export { className as class };
  export let wider = false;
</script>

<div class={cn('container', className)} class:wider>
  <slot />
</div>

<style lang="postcss">
  .container {
    max-width: 1280px;
    margin: 0 auto;

    &.wider {
      max-width: 1536px;
    }
  }
</style>
