<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from 'shadcn-ui/avatar';
  import { getInitials, getTimeElapsed } from '#lib';
  import type { NotificationInitiator, NotificationType } from '#lib/stores/notifications';

  export let id: string;
  export let type: NotificationType;
  export let initiator: NotificationInitiator;
  export let read: boolean;
  export let createdAt: string;

  $: message = getMessage(type, new Date(createdAt));

  function getMessage(type: NotificationType, date: Date): string {
    switch (type) {
      case 'JOINED_TEAM':
        return `joined your team about ${getTimeElapsed(date)}`;
      default:
        return '';
    }
  }
</script>

<div data-name="Notification" data-id={id} class:unread={!read}>
  <Avatar>
    <AvatarImage src={initiator.avatar} alt="{initiator.name}'s profile picture" />
    <AvatarFallback>
      {getInitials(initiator.name)}
    </AvatarFallback>
  </Avatar>
  <div class="ml-3">
    <p class="leading-5 text-gray-600">
      <strong class="">{initiator.name}</strong>
      {message}
    </p>
  </div>
</div>

<style lang="postcss">
  [data-name='Notification'] {
    @apply flex items-center p-4;

    &.unread {
      @apply bg-blue-50/80;

      &:not(:last-child) {
        @apply border-b border-blue-200;
      }
    }

    &:not(:last-child) {
      @apply border-b border-slate-200;
    }
  }
</style>
