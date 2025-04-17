<script>
import { fly } from 'svelte/transition';
import { Copy } from 'phosphor-svelte';
import { goto } from '$app/navigation';
import { PUBLIC_DOMAIN } from '$env/static/public';
import { Button } from 'shadcn/button';
import { Input } from 'shadcn/input';

// TODO: Replace with actual invite link
const INVITE_LINK = `https://${PUBLIC_DOMAIN}/invite/${crypto.randomUUID()}`;

let showTooltip = $state(false);
let copying = $state(false);

let ariaLabel = $derived(copying ? 'Copying link...' : 'Copy invite link');

async function copyInviteLink() {
  copying = true;
  await navigator.clipboard.writeText(INVITE_LINK);
  copying = false;

  showTooltip = true;
  setTimeout(() => {
    showTooltip = false;
  }, 2000);
}
</script>

<svelte:head>
  <title>Invite your team — Onboarding | Survie</title>
</svelte:head>

<main>
  <h1>Do you want to invite any team members to help you create and review your surveys?</h1>
  <p class="description">Share this link with people who should be part of your team.</p>

  <div class="flex w-full items-center space-x-2">
    <Input value={INVITE_LINK} readonly class="grow" />
    <Button
      type="submit"
      class="relative"
      loading={copying}
      aria-label={ariaLabel}
      onclick={copyInviteLink}
    >
      <Copy size="20px" aria-hidden="true" />

      {#if showTooltip}
        <span class="tooltip" aria-live="polite" transition:fly={{ y: 20, duration: 200 }}>
          Link copied!
        </span>
      {/if}
    </Button>
  </div>

  <Button class="mt-10" on:click={() => goto('/app')}>Continue</Button>
</main>

<style lang="postcss">
.tooltip {
  @apply absolute -top-[115%] inline-block rounded-md bg-black px-2.5 py-1.5 text-sm;

  &::after {
    @apply absolute -bottom-1 left-[43%] inline-block rotate-45 transform;
    @apply -z-[1] h-3 w-3 border-l-0 border-r-0 border-t-0 border-black bg-black;
    content: '';
  }
}
</style>
