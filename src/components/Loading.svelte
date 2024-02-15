<!--suppress CssUnusedSymbol, ReservedWordAsName -->
<script lang="ts">
  import { cn } from '#components/shadcn/utils';

  const DURATION_UNIT_REGEX = /s|ms$/;

  let className: string | undefined = undefined;
  export { className as class };
  export let color = '#fff';
  export let duration = '1.2s';
  export let size = '60px';
  export let pause = false;

  let durationUnit: string = duration.match(DURATION_UNIT_REGEX)?.[0] ?? 's';
  let durationNum: string = duration.replace(DURATION_UNIT_REGEX, '');

  function range(size: number, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }
</script>

<div
  class={cn('wrapper', className)}
  style:--size={size}
  style:--color={color}
  style:--duration={duration}
  {...$$restProps}
>
  {#each range(5, 1) as version}
    <div
      class="rect"
      class:pause-animation={pause}
      style="animation-delay: {(version - 1) * (+durationNum / 12)}{durationUnit}"
    />
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
