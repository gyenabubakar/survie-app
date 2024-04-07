<script>
  import { fly } from 'svelte/transition';
  import { Copy } from 'phosphor-svelte';
  import { PUBLIC_DOMAIN } from '$env/static/public';
  import { goto } from '$app/navigation';
  import { Button, Input } from 'shadcn-ui';

  let inviteLink = `https://${PUBLIC_DOMAIN}/invite/${crypto.randomUUID()}`;
  let showTooltip = false;
  let copying = false;

  $: ariaLabel = copying ? 'Copying link...' : 'Copy invite link';

  async function copyInviteLink() {
    copying = true;
    await navigator.clipboard.writeText(inviteLink);
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
    <Input value={inviteLink} readonly class="grow" />
    <Button
      type="submit"
      class="relative"
      loading={copying}
      aria-label={ariaLabel}
      on:click={copyInviteLink}
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
