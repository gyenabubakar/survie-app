<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import { Bell, CaretDown, Pulse, SignOut } from 'phosphor-svelte';
  import { Button } from 'shadcn-ui';
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
  } from 'shadcn-ui/dropdown-menu';
  import { Popover, PopoverTrigger, PopoverContent } from 'shadcn-ui/popover';
  import { Avatar, AvatarFallback, AvatarImage } from 'shadcn-ui/avatar';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { createNotificationStore } from '#lib/stores/notifications';
  import { fakeAvatar } from '#lib/fakes';
  import { Container, Logo } from '#components';
  import { cn } from '#components/shadcn/utils';
  import { Notification } from '#components/dashboard';

  const { notifications, hasUnread } = createNotificationStore();

  $: onDashboardPage = $page.url.pathname === '/app';
  $: onSurveysPage = $page.url.pathname === '/app/surveys';
  $: onResponsesPage = $page.url.pathname === '/app/responses';
  $: onAIPage = $page.url.pathname === '/app/ai';
</script>

<header>
  <Container size="2xl" class="py-3 flex items-center justify-between">
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

          <DropdownMenu preventScroll={false}>
            <DropdownMenuTrigger>
              <li>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a role="button" tabindex="0" on:keyup>
                  <span class="mr-1">Account</span>
                  <CaretDown size="16px" weight="bold" />
                </a>
              </li>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
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
        </ul>
      </nav>
    </div>

    <div class="flex items-center gap-2.5" style="justify-self: flex-end;">
      <Popover>
        <PopoverTrigger>
          <button class="py-0 px-2 bg-black/5 flex items-center rounded-md">
            <Pulse weight="fill" class="mr-1" />
            <span style="font-family: sans-serif;">0</span>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <p>
            <span style="font-family: sans-serif;">{0}</span> survey responses so far this month.
          </p>
          <p class="text-sm text-gray-500">This is will reset on the 1st of September.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <button class="relative flex items-center mx-3">
            <Bell size="24px" class={cn($hasUnread ? 'text-gray-600' : 'text-gray-400')} />
            {#if $hasUnread}
              <span
                class="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0 border-2 border-white"
              />
            {/if}
          </button>
        </PopoverTrigger>
        <PopoverContent
          class={cn(
            'w-[300px] p-0',
            !$notifications.length && 'min-h-[115px] flex items-center justify-center'
          )}
        >
          {#each $notifications as notification (notification.id)}
            <Notification {...notification} />
          {:else}
            <p class="text-sm text-gray-500">You don't have any notifications at yet.</p>
          {/each}

          {#if $notifications.length}
            <div class="p-2">
              <Button class="w-full" on:click={() => goto('/app/notifications')}>
                See all notifications
              </Button>
            </div>
          {/if}
        </PopoverContent>
      </Popover>

      <DropdownMenu preventScroll={false}>
        <DropdownMenuTrigger>
          <button class="flex items-center justify-center">
            <Avatar class="w-[35px] h-[35px]">
              <AvatarImage src={fakeAvatar} alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <a href="/#">My account</a>
            </DropdownMenuItem>
            <DropdownMenuItem id="logout-link">
              <a href="/app/log-out" class="flex items-center justify-between w-full">
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

<slot />

<style lang="postcss">
  header {
    @apply fixed left-0 right-0 top-0 border-b border-b-slate-200 bg-white;
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
    @apply pt-12;

    & :global(h1) {
      @apply mb-4 text-3xl font-bold;
    }
  }
</style>
