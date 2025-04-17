<!-- @migration-task Error while migrating Svelte code: Cannot set properties of undefined (setting 'next') -->
<!--suppress ReservedWordAsName -->
<script lang="ts">
import { Button } from 'shadcn/button';
import { cn } from 'shadcn/utils';
import type { ButtonProps } from 'shadcn/button';
import { Loading } from '#components';

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
  class={cn(className, 'relative')}
  {...restProps}
>
  {@render children?.()}

  <span
    class="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center"
    aria-label={loadingText}
  >
    <Loading size="23px" aria-hidden="true" />
  </span>
</Button>
