<script lang="ts">
import { PlusIcon } from '@lucide/svelte';
import { Avatar, AvatarFallback, AvatarImage } from 'shadcn/avatar';
import { getInitials, getTimeElapsed } from '#lib';
import type { AppNotification, NotificationType } from '#features/notifications/types';

interface Props extends AppNotification {
  large?: boolean;
}

let { large = false, id, type, initiator, readAt, createdAt }: Props = $props();

const message = $derived.by(() => {
  const typeMessageMap: Record<NotificationType, string> = {
    JOINED_TEAM: `joined your team about ${getTimeElapsed(createdAt)}`,
  };
  return typeMessageMap[type] || '';
});
</script>

<div
  data-name="Notification"
  data-id={id}
  class:px-0={large}
  class={[
    'flex items-center p-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-slate-200',
    !readAt && !large
      ? 'bg-blue-50/80 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-blue-200'
      : null,
  ]}
>
  <div class="relative h-max w-max overflow-visible">
    <Avatar>
      <AvatarImage src={initiator.avatar} alt="{initiator.name}'s profile picture" />
      <AvatarFallback>
        {getInitials(initiator.name)}
      </AvatarFallback>
    </Avatar>

    {#if type === 'JOINED_TEAM'}
      <span
        class="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-pink-500 text-white"
      >
        <PlusIcon class="size-3" />
      </span>
    {/if}
  </div>

  <div class="ml-3">
    <p class="leading-5 text-gray-600">
      <strong class="">{initiator.name}</strong>
      {message}
    </p>
  </div>
</div>

<style lang="postcss">
</style>
