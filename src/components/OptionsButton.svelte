<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { DotsThreeOutline } from 'phosphor-svelte';
  import { Button } from 'shadcn-ui';
  import { cn } from '#components/shadcn/utils';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    class?: string;
  };

  let className: string | undefined = undefined;
  export { className as class };
</script>

<Button variant="outline" size="icon" class={cn('h-[30px]', className)} {...$$restProps}>
  <DotsThreeOutline weight="fill" size="20px" class="text-gray-400" />
</Button>
