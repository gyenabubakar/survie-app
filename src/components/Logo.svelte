<!--suppress JSUnusedGlobalSymbols, ReservedWordAsName -->
<script lang="ts">
  import { cn } from '#components/shadcn/utils';
  import type { HTMLLinkAttributes } from 'svelte/elements';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = HTMLLinkAttributes;

  let className: string | undefined | null = '';
  export { className as class };
</script>

<a id="logo" href="/" class={cn('w-max inline-block', className)} {...$$restProps}>
  <enhanced:img src="#assets/survie.svg" alt="Survie logo" width="40" height="40" />
</a>
