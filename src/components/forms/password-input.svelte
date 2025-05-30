<script lang="ts">
import { EyeIcon, EyeOffIcon } from '@lucide/svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { WithElementRef } from 'bits-ui';
import { Input } from 'shadcn/input';
import { cn } from 'shadcn/utils';
import { TooltipWrapper } from '#components';

let {
  ref = $bindable(null),
  value = $bindable(),
  class: className,
  ...restProps
}: WithElementRef<Omit<HTMLInputAttributes, 'files'>> = $props();

let passwordRevealed = $state(false);

const ToggleRevealIcon = $derived(passwordRevealed ? EyeOffIcon : EyeIcon);
const toggleTooltip = $derived(passwordRevealed ? 'Hide password' : 'Show password');
</script>

<div class="relative">
  <Input
    {...restProps}
    bind:ref
    bind:value
    type={passwordRevealed ? 'text' : 'password'}
    placeholder="••••••••"
    class={cn('pr-12', className)}
  />

  <TooltipWrapper message={toggleTooltip}>
    {#snippet children({ props })}
      <button
        {...props}
        type="button"
        tabindex="-1"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
        onclick={() => (passwordRevealed = !passwordRevealed)}
      >
        <ToggleRevealIcon />
      </button>
    {/snippet}
  </TooltipWrapper>
</div>
