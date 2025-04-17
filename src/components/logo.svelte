<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { cn } from '#components/shadcn/utils';

  type Props = HTMLAnchorAttributes & {
    small?: boolean;
  };

  let { small, class: className, id = 'logo', href = '/', ...restProps }: Props = $props();
</script>

<a {id} {href} class={cn('w-max inline-block', className)} {...restProps}>
  <enhanced:img
    src="#assets/survie.svg"
    alt="Survie logo"
    width={small ? 35 : 40}
    height={small ? 35 : 40}
  />
</a>
