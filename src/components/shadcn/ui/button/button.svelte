<!--suppress ReservedWordAsName -->
<script lang="ts">
  import { Button as ButtonPrimitive } from 'bits-ui';
  import { cn } from '#components/shadcn/utils';
  import { buttonVariants, type Props, type Events } from '.';
  import { Loading } from '#components';

  type $$Props = Props & {
    loading?: boolean;
  };
  type $$Events = Events;

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'default';
  export let builders: $$Props['builders'] = [];
  export let loading: boolean | undefined = undefined;
</script>

<ButtonPrimitive.Root
  {builders}
  class={cn(buttonVariants({ variant, size, className }))}
  type="button"
  aria-live={loading !== undefined ? 'polite' : undefined}
  {...$$restProps}
  on:click
  on:keydown
>
  {#if !loading}
    <slot />
  {:else}
    <Loading size="23px" aria-hidden="true" />
  {/if}
</ButtonPrimitive.Root>
