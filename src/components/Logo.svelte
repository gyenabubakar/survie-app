<!--suppress JSUnusedGlobalSymbols, ReservedWordAsName -->
<script lang="ts">
  import type { HTMLLinkAttributes } from 'svelte/elements';
  import { cn } from '#components/shadcn/utils';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = HTMLLinkAttributes & {
    class?: string;
    small?: boolean;
  };

  let className: string | undefined | null = '';
  export { className as class };
  export let small: boolean = false;
</script>

<a id="logo" href="/" class={cn('w-max inline-block', className)} {...$$restProps}>
  <enhanced:img
    src="#assets/survie.svg"
    alt="Survie logo"
    width={small ? 35 : 40}
    height={small ? 35 : 40}
  />
</a>
