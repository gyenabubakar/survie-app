<!--suppress ReservedWordAsName -->
<script lang="ts">
import { Button } from 'shadcn/button';
import { cn } from 'shadcn/utils';
import type { ButtonProps } from 'shadcn/button';
import { Loading } from '#components/index';

type Props = ButtonProps & {
  loading?: boolean;
  loadingText?: string;
};

let {
  children,
  loading,
  loadingText = 'Processing...',
  disabled,
  class: className,
  ...restProps
}: Props = $props();
</script>

<Button
  type="button"
  disabled={disabled || loading}
  aria-live={loading !== undefined ? 'polite' : undefined}
  class={cn(className, 'relative overflow-hidden')}
  {...restProps}
>
  {@render children?.()}

  {#if loading}
    <span
      class="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/85"
      aria-label={loadingText}
    >
      <Loading size="23px" aria-hidden="true" />
    </span>
  {/if}
</Button>
