<!--suppress JSDeprecatedSymbols -->
<script lang="ts">
import { self } from 'svelte/legacy';
import { PUBLIC_DOMAIN } from '$env/static/public';
import type { HTMLInputAttributes } from 'svelte/elements';
import { Input } from 'shadcn/input';

type Props = Omit<HTMLInputAttributes, 'type' | 'files' | 'class'>;

let { value = $bindable(''), ...restProps }: Props = $props();

let input: HTMLInputElement | null = $state(null);

function handleClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.tagName !== 'INPUT') {
    input?.focus();
  }
}
</script>

<div
  class="input-wrapper relative h-max w-full"
  role="textbox"
  tabindex="0"
  onclick={handleClick}
  onkeydown={self(() => input?.focus())}
>
  <span class="absolute left-3 translate-y-1/3 text-muted-foreground">{PUBLIC_DOMAIN}/@</span>
  <Input bind:ref={input} bind:value type="text" class="pl-[130px] font-medium" {...restProps} />
</div>

<style lang="postcss">
</style>
