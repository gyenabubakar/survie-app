<script lang="ts">
  import { Label as LabelPrimitive } from 'bits-ui';
  import { cn } from '#components/shadcn/utils';

  type $$Props = LabelPrimitive.Props & {
    required?: boolean;
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let required = false;
</script>

<LabelPrimitive.Root
  class={cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    className
  )}
  {...$$restProps}
>
  <slot />
  {#if required}
    &nbsp;<span class="text-red-500">*</span>
  {/if}
</LabelPrimitive.Root>
