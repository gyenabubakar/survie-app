<!--suppress JSUnusedGlobalSymbols, ReservedWordAsName -->

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLParagraphElement> & {
    message: string | null | undefined;
  };

  let { class: className = undefined, message }: Props = $props();
</script>

{#if message}
  <p class={['text-red-500 text-sm mt-0.5', className]} aria-live="polite">{message}</p>
{/if}
