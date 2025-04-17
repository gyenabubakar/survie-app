<script lang="ts">
  import { Label as LabelPrimitive } from 'bits-ui';
  import { cn } from '#components/shadcn/utils';

  type $$Props = LabelPrimitive.Props & {
    required?: boolean;
  };

  interface Props {
    class?: $$Props['class'];
    required?: boolean;
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, required = false, children, ...rest }: Props = $props();
</script>

<LabelPrimitive.Root
  class={cn(
    'text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    className
  )}
  {...rest}
>
  {@render children?.()}
  {#if required}
    &nbsp;<span class="text-red-500">*</span>
  {/if}
</LabelPrimitive.Root>
