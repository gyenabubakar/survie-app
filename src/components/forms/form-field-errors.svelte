<script lang="ts">
import { FieldErrors } from 'formsnap';
import type { Snippet } from 'svelte';
import type { FieldErrorsProps } from 'formsnap';
import { cn } from 'shadcn/utils';

type BaseProps = Omit<FieldErrorsProps, 'children' | 'child'>;

interface Props extends BaseProps {
  errorClasses?: string | undefined | null;
  children?: Snippet;
}

let {
  ref = $bindable(null),
  children: rootChildren,
  class: className,
  errorClasses,
  ...restProps
}: Props = $props();
</script>

<FieldErrors bind:ref class={cn('text-sm font-medium text-destructive', className)} {...restProps}>
  {#snippet children({ errors, errorProps })}
    {#each errors.slice(0, 1) as error (error)}
      <div {...errorProps} class={cn(errorClasses)}>{error}</div>
    {:else}
      {@render rootChildren?.()}
    {/each}
  {/snippet}
</FieldErrors>
