<script lang="ts">
import { DotsThreeOutline } from 'phosphor-svelte';
import { Button } from 'shadcn/button';
import { cn } from 'shadcn/utils';
import type { Props } from 'shadcn/button';

let { class: className, ...restProps }: Props = $props();
</script>

<Button variant="outline" size="icon" class={cn('h-[30px]', className)} {...restProps}>
  <DotsThreeOutline weight="fill" size="20px" class="text-gray-400" />
</Button>
