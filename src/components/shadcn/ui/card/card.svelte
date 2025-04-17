<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#components/shadcn/utils';

  type $$Props = HTMLAttributes<HTMLDivElement>;

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cn(
    'rounded-xl border border-slate-100 bg-card text-card-foreground shadow-lg shadow-slate-100',
    className
  )}
  {...rest}
  onclick={bubble('click')}
  onfocusin={bubble('focusin')}
  onfocusout={bubble('focusout')}
  onmouseenter={bubble('mouseenter')}
  onmouseleave={bubble('mouseleave')}
>
  {@render children?.()}
</div>
