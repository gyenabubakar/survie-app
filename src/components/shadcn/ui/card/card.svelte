<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#components/shadcn/utils';

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={cn(
    'rounded-xl border border-slate-100 bg-card text-card-foreground shadow-lg shadow-slate-100',
    className
  )}
  {...$$restProps}
  on:click
  on:focusin
  on:focusout
  on:mouseenter
  on:mouseleave
>
  <slot />
</div>
