<!--suppress JSUnusedGlobalSymbols, ReservedWordAsName -->

<script lang="ts">
  import { cn } from '#components/shadcn/utils';

  let className: string | undefined = undefined;
  export { className as class };
  export let message: string | undefined | null;
</script>

{#if message}
  <p class={cn('text-red-500 text-sm', className)}>{message}</p>
{/if}
