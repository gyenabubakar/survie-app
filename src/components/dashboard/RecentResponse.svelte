<script lang="ts">
  import { Button } from 'shadcn-ui';
  import { Avatar, AvatarFallback, AvatarImage } from 'shadcn-ui/avatar';
  import { getInitials, getTimeElapsed } from '#lib';

  export let id: string;
  export let avatar: string | null;
  export let username: string;
  export let survey: string;
  export let completedAt: string;
</script>

<div class="flex items-center justify-between p-5" data-id={id} data-name="RecentResponse">
  <div class="flex items-center">
    <div class="avatar mr-3">
      <Avatar>
        <AvatarImage src={avatar} alt="{username}'s avatar" />
        <AvatarFallback>{getInitials(username)}</AvatarFallback>
      </Avatar>
    </div>

    <div class="">
      <p class="leading-5">{username}</p>
      <p class="text-sm text-gray-400">
        Completed the <span class="text-gray-950">{survey}</span> survey
        <span>{getTimeElapsed(completedAt)}</span>.
      </p>
    </div>
  </div>

  <div>
    <Button variant="outline" class="text-gray-700">View</Button>
  </div>
</div>

<style lang="postcss">
  [data-name='RecentResponse'] {
    &:not(:last-child) {
      @apply border-b border-slate-100;
    }
  }
</style>
