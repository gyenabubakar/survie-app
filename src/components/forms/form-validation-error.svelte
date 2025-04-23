<!--suppress JSUnusedGlobalSymbols, ReservedWordAsName -->

<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';

type Props = HTMLAttributes<HTMLParagraphElement> & {
  message: string | null | undefined;
};

let { class: className = undefined, message }: Props = $props();
</script>

{#if message}
  <p class={['mt-0.5 text-sm text-red-500', className]} aria-live="polite">{message}</p>
{/if}
