<!--suppress CssUnusedSymbol -->
<script lang="ts">
import { Bell, CaretDown, Pulse, SignOut } from 'phosphor-svelte';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { Avatar, AvatarFallback, AvatarImage } from 'shadcn/avatar';
import { Button } from 'shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shadcn/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/popover';
import { cn } from 'shadcn/utils';
import { Container, Logo } from '#components';
import { Notification } from '#components/dashboard';
import { fakeAvatar } from '#lib/fakes';
import { createNotificationStore } from '#lib/stores/notifications';

let { children } = $props();

const { notifications, hasUnread } = createNotificationStore();

let onDashboardPage = $derived(page.url.pathname === '/app');
let onSurveysPage = $derived(page.url.pathname === '/app/surveys');
let onResponsesPage = $derived(page.url.pathname === '/app/responses');
let onAIPage = $derived(page.url.pathname === '/app/ai');
</script>

<header>
  <Container size="2xl" class="flex items-center justify-between py-3">
    <div class="flex items-center">
      <Logo small class="mr-8" />

      <nav class="">
        <ul>
          <li>
            <a href="/app/" class:active={onDashboardPage}>Dashboard</a>
          </li>
          <li>
            <a href="/app/surveys" class:active={onSurveysPage}>Surveys</a>
          </li>
          <li>
            <a href="/app/responses" class:active={onResponsesPage}> Responses </a>
          </li>
          <li>
            <a href="/app/ai" class:active={onAIPage}>AI</a>
          </li>

          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {#snippet child({ props })}
                  <a {...props} tabindex="0" role="button">
                    <span class="mr-1">Account</span>
                    <CaretDown size="16px" weight="bold" class="inline" />
                  </a>
                {/snippet}
              </DropdownMenuTrigger>
              <DropdownMenuContent preventScroll={false} class="h-max">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <a href="/#"> Survey Settings </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#">Company details</a>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <a href="/#">Manage team</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#">Join team link</a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex items-center gap-2.5">
      <Popover>
        <PopoverTrigger>
          {#snippet child({ props })}
            <button {...props} class="flex items-center rounded-md bg-black/5 px-2 py-0">
              <Pulse weight="fill" class="mr-1" />
              <span style="font-family: sans-serif;">0</span>
            </button>
          {/snippet}
        </PopoverTrigger>
        <PopoverContent preventScroll={false} class="h-max">
          <p>
            <span style="font-family: sans-serif;">{0}</span> survey responses so far this month.
          </p>
          <p class="text-sm text-gray-500">This is will reset on the 1st of September.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          {#snippet child({ props })}
            <button {...props} class="relative mx-3 flex items-center">
              <Bell size="24px" class={cn($hasUnread ? 'text-gray-600' : 'text-gray-400')} />
              {#if $hasUnread}
                <span
                  class="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-red-500"
                ></span>
              {/if}
            </button>
          {/snippet}
        </PopoverTrigger>
        <PopoverContent
          preventScroll={false}
          class={cn(
            'h-max w-[300px] p-0',
            !$notifications.length && 'flex h-[115px] items-center justify-center',
          )}
        >
          {#each $notifications as notification (notification.id)}
            <Notification {...notification} />
          {:else}
            <p class="text-sm text-gray-500">You don't have any notifications at yet.</p>
          {/each}

          {#if $notifications.length}
            <div class="p-2">
              <Button class="w-full" onclick={() => goto('/app/notifications')}>
                See all notifications
              </Button>
            </div>
          {/if}
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger>
          {#snippet child({ props })}
            <button {...props} class="flex items-center justify-center">
              <Avatar class="h-[35px] w-[35px]">
                <AvatarImage src={fakeAvatar} alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </button>
          {/snippet}
        </DropdownMenuTrigger>
        <DropdownMenuContent preventScroll={false} class="h-max">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <a href="/#">My account</a>
            </DropdownMenuItem>
            <DropdownMenuItem id="logout-link">
              <a href="/app/log-out" class="flex w-full items-center justify-between">
                <span>Log out</span>
                <SignOut weight="bold" />
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </Container>
</header>

{@render children?.()}

<style lang="postcss">
header {
  @apply fixed left-0 right-0 top-0 h-[59px] border-b border-b-slate-200 bg-white;
}

:global(main) {
  @apply mt-[60px] pb-24;
}

nav a {
  @apply text-lg font-medium text-gray-500/80 hover:text-black;

  &.active {
    @apply text-black;
  }

  &[role='button'] {
    @apply flex items-center;
  }
}

ul {
  @apply flex items-center;

  & li:not(:last-child) {
    @apply mr-8;
  }
}

:global([data-menu-content]) {
  @apply focus:!outline-0;

  :global([data-menu-item]) {
    @apply hover:bg-black/5;
  }

  a {
    @apply text-base text-black;
  }
}

:global(#logout-link) {
  @apply hover:bg-red-50;

  & a {
    @apply text-red-500;
  }
}

:global(main) {
  @apply flex-grow bg-slate-50/80 pt-12;

  & :global(h1) {
    @apply mb-4 text-3xl font-bold;
  }
}

:global(body > div) {
  @apply flex h-screen flex-col;
}
</style>
