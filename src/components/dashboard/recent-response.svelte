<script lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from 'shadcn/avatar';
import { Button } from 'shadcn/button';
import { getInitials, getTimeElapsed } from '#lib';

interface Props {
  id: string;
  avatar: string | null;
  username: string;
  survey: string;
  completedAt: string;
}

let { id, avatar, username, survey, completedAt }: Props = $props();
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
