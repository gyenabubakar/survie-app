<!--suppress CssUnusedSymbol -->
<script lang="ts">
import { Bell, CaretDown, Pulse, SignOut } from 'phosphor-svelte';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import * as Avatar from 'shadcn/avatar';
import { Button } from 'shadcn/button';
import * as DropdownMenu from 'shadcn/dropdown-menu';
import * as Popover from 'shadcn/popover';
import { cn } from 'shadcn/utils';
import { NotificationsContext } from '#features/notifications/context';
import { Notification } from '#features/notifications/ui';
import { Container, Logo } from '#components';
import { fakeAvatar } from '#lib/fakes';

let { children } = $props();

const notifications = new NotificationsContext();

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
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {#snippet child({ props })}
                  <a {...props} tabindex="0" role="button">
                    <span class="mr-1">Account</span>
                    <CaretDown size="16px" weight="bold" class="inline" />
                  </a>
                {/snippet}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content preventScroll={false} class="h-max">
                <DropdownMenu.Group>
                  <DropdownMenu.Item>
                    <a href="/#"> Survey Settings </a>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <a href="/#">Company details</a>
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator />

                  <DropdownMenu.Item>
                    <a href="/#">Manage team</a>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <a href="/#">Join team link</a>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex items-center gap-2.5">
      <Popover.Root>
        <Popover.Trigger>
          {#snippet child({ props })}
            <button {...props} class="flex items-center rounded-md bg-black/5 px-2 py-0">
              <Pulse weight="fill" class="mr-1" />
              <span style="font-family: sans-serif;">0</span>
            </button>
          {/snippet}
        </Popover.Trigger>
        <Popover.Content preventScroll={false} class="h-max">
          <p>
            <span style="font-family: sans-serif;">{0}</span> survey responses so far this month.
          </p>
          <p class="text-sm text-gray-500">This is will reset on the 1st of September.</p>
        </Popover.Content>
      </Popover.Root>

      <Popover.Root>
        <Popover.Trigger>
          {#snippet child({ props })}
            <button {...props} class="relative mx-3 flex items-center">
              <Bell
                size="24px"
                class={cn(notifications.hasUnread ? 'text-gray-600' : 'text-gray-400')}
              />
              {#if notifications.hasUnread}
                <span
                  class="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-red-500"
                ></span>
              {/if}
            </button>
          {/snippet}
        </Popover.Trigger>
        <Popover.Content
          preventScroll={false}
          class={cn(
            'h-max w-[300px] p-0',
            !notifications.all.length && 'flex h-[115px] items-center justify-center',
          )}
        >
          {#each notifications.all as notification (notification.id)}
            <Notification {...notification} />
          {:else}
            <p class="text-sm text-gray-500">You don't have any notifications at yet.</p>
          {/each}

          {#if notifications.all.length}
            <div class="p-2">
              <Button class="w-full" onclick={() => goto('/app/notifications')}>
                See all notifications
              </Button>
            </div>
          {/if}
        </Popover.Content>
      </Popover.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <button {...props} class="flex items-center justify-center">
              <Avatar.Root class="h-[35px] w-[35px]">
                <Avatar.Image src={fakeAvatar} alt="Avatar" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar.Root>
            </button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content preventScroll={false} class="h-max">
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <a href="/#">My account</a>
            </DropdownMenu.Item>
            <DropdownMenu.Item id="logout-link">
              <a href="/app/log-out" class="flex w-full items-center justify-between">
                <span>Log out</span>
                <SignOut weight="bold" />
              </a>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
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
