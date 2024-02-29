<!--suppress CssUnusedSymbol -->
<script lang="ts">
  import { Bell, CaretDown, Pulse, SignOut } from 'phosphor-svelte';
  import { page } from '$app/stores';
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
  } from '#shadcn-ui/dropdown-menu';
  import { Popover, PopoverTrigger, PopoverContent } from '#shadcn-ui/popover';
  import { Avatar, AvatarFallback, AvatarImage } from '#shadcn-ui/avatar';
  import { createNotificationStore } from '$lib/stores/notifications';
  import { fakeAvatar } from '$lib/fakes';
  import { Container, Logo } from '#components';
  import { cn } from '#components/shadcn/utils';

  const { notifications, hasUnread } = createNotificationStore();

  function isActiveLink(path: string) {
    return $page.url.pathname === path;
  }
</script>

<header class="border-b border-b-gray-200 drop-shadow-sm">
  <Container size="2xl" class="py-2 flex items-center justify-between">
    <div class="flex items-center">
      <Logo small class="mr-8" />

      <nav class="">
        <ul>
          <li>
            <a href="/app/" class:active={isActiveLink('/app')}>Dashboard</a>
          </li>
          <li>
            <a href="/app/surveys" class:active={isActiveLink('/app/surveys')}>Surveys</a>
          </li>
          <li>
            <a href="/app/responses" class:active={isActiveLink('/app/responses')}> Responses </a>
          </li>
          <li>
            <a href="/app/ai" class:active={isActiveLink('/app/ai')}>AI</a>
          </li>

          <DropdownMenu>
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
          class={cn(!$notifications.length && 'min-h-[115px] flex items-center justify-center')}
        >
          {#if $notifications.length}
            Hi
          {:else}
            <p class="text-sm text-gray-500">You don't have any notifications at yet.</p>
          {/if}
        </PopoverContent>
      </Popover>

      <DropdownMenu>
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
    @apply fixed left-0 right-0 top-0 bg-white;
  }

  :global(main) {
    margin-top: 60px;
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

    & :global([data-menu-item]) {
      @apply hover:bg-black/5;
    }

    & a {
      @apply text-base text-black;
    }
  }

  :global(#logout-link) {
    @apply hover:bg-red-50;

    & a {
      @apply text-red-500;
    }
  }
</style>
