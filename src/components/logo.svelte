<script lang="ts">
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { cn } from 'shadcn/utils';

type Props = HTMLAnchorAttributes & {
  small?: boolean;
};

let { small, class: className, id = 'logo', href = '/', ...restProps }: Props = $props();
</script>

<a
  {id}
  href={href === '#' ? undefined : href}
  class={cn('inline-block w-max', className)}
  {...restProps}
>
  <enhanced:img
    src="#assets/survie.svg"
    alt="Survie logo"
    style:--width={small ? '35px' : '40px'}
    style:--height={small ? '35px' : '40px'}
    style="width: var(--width); height: var(--height);"
  />
</a>
