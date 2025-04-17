<script lang="ts">
  import { DotsThreeOutline } from 'phosphor-svelte';
  import type { Props } from 'shadcn-ui/button';
  import { Button } from 'shadcn-ui';
  import { cn } from '#components/shadcn/utils';

  let { class: className, ...restProps }: Props = $props();
</script>

<Button variant="outline" size="icon" class={cn('h-[30px]', className)} {...restProps}>
  <DotsThreeOutline weight="fill" size="20px" class="text-gray-400" />
</Button>
