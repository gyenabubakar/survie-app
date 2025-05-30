<!--suppress CssUnusedSymbol, ReservedWordAsName -->
<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';

const DURATION_UNIT_REGEX = /s|ms$/;

type Props = HTMLAttributes<HTMLDivElement> & {
  color?: string;
  duration?: string;
  size?: string;
  pause?: boolean;
};

let {
  class: className,
  color = '#fff',
  duration = '1.2s',
  size = '60px',
  pause = false,
  ...restProps
}: Props = $props();

const durationUnit: string = $derived(duration.match(DURATION_UNIT_REGEX)?.[0] ?? 's');
const durationNum: string = $derived(duration.replace(DURATION_UNIT_REGEX, ''));

function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}
</script>

<div
  class={['wrapper', className]}
  style:--size={size}
  style:--color={color}
  style:--duration={duration}
  aria-hidden="true"
  {...restProps}
>
  {#each range(5, 1) as version (version)}
    <div
      class="rect"
      class:pause-animation={pause}
      style="animation-delay: {(version - 1) * (+durationNum / 12)}{durationUnit}"
    ></div>
  {/each}
</div>

<style lang="postcss">
.wrapper {
  height: var(--size);
  width: var(--size);
  @apply inline-block text-center text-[10px];
}

.rect {
  background-color: var(--color);
  animation: stretch var(--duration) ease-in-out infinite;
  @apply mr-[4px] inline-block h-full w-[10%] scale-y-[0.4] transform;

  &.pause-animation {
    animation-play-state: paused;
  }
}

@keyframes stretch {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
