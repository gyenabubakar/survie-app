<script lang="ts">
import type { Snippet } from 'svelte';
import type { TooltipContentProps } from 'bits-ui';
import * as Tooltip from 'shadcn/tooltip';

interface Props extends Pick<TooltipContentProps, 'side' | 'class'> {
  message: string | Snippet;
  children: Snippet<[{ props: Record<string, unknown> }]>;
}

let { message, side = 'top', class: className, children }: Props = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        {@render children({ props })}
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Content {side} class={className}>
      {#if typeof message === 'string'}
        <p>{message}</p>
      {:else}
        {@render message()}
      {/if}
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
