<script lang="ts">
  import { User } from 'phosphor-svelte';
  import { formatDistanceToNow, parseISO } from 'date-fns';
  import { Button } from '#shadcn-ui';

  export let id: string;
  export let avatar: string | null;
  export let username: string;
  export let survey: string;
  export let completedAt: string;

  $: elapsedTime = formatDistanceToNow(parseISO(completedAt), { addSuffix: true });
</script>

<div class="flex items-center justify-between p-5" data-id={id} data-name="RecentResponse">
  <div class="flex items-center">
    <div class="avatar mr-3">
      {#if avatar}
        <img src={avatar} alt="{username}'s avatar" class="w-10 h-10 rounded-full" />
      {:else}
        <div
          class="w-10 h-10 bg-blue-50 rounded-full overflow-hidden flex items-center justify-center"
        >
          <User size="24px" weight="fill" class="text-blue-600" />
        </div>
      {/if}
    </div>

    <div class="">
      <p class="leading-5">{username}</p>
      <p class="text-sm text-gray-400">
        Completed the <span class="text-gray-950">{survey}</span> survey
        <span>{elapsedTime}</span>.
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
