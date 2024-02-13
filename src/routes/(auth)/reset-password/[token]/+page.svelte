<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { Label, Button, Input } from '#shadcn-ui';
  import { FormValidationError, FormMessage, Loading } from '#components';

  export let form;

  let submitting = false;

  const handleSubmit: SubmitFunction = ({ cancel }) => {
    if (submitting) return cancel();
    submitting = true;

    if (form?.validationErrors) form.validationErrors = undefined;

    return async ({ update }) => {
      await update();
      submitting = false;
    };
  };
</script>

<svelte:head>
  <title>Reset Password | Survie</title>
</svelte:head>

<main>
  <h1 style="margin-bottom: 0;">Reset Password</h1>
  <p class="text-sm text-gray-500 mb-6">
    Set a new password for your account: <strong>john@doe.com</strong>.
  </p>

  {#if form?.error}
    <FormMessage>{form.error}</FormMessage>
  {:else if form?.success}
    <FormMessage variant="success">Your password has been changed successfully.</FormMessage>
  {/if}

  {#if !form?.success}
    <form method="post" use:enhance={handleSubmit}>
      <div class="form-field">
        <Label for="password">New Password</Label>
        <Input type="password" id="password" name="password" required />
        <FormValidationError message={form?.validationErrors?.password} />
      </div>

      <div class="form-field">
        <Label for="confirm-password">Confirm Password</Label>
        <Input type="password" id="confirm-password" name="confirmPassword" required />
        <FormValidationError message={form?.validationErrors?.confirmPassword} />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        aria-live="polite"
        aria-label={!submitting ? undefined : 'Changing password, please wait'}
      >
        {#if !submitting}
          Change password
        {:else}
          <Loading size="23px" aria-hidden="true" />
        {/if}
      </Button>
    </form>
  {/if}

  {#if form?.success}
    <Button type="button" role="link" class="w-full" on:click={() => goto('/log-in')}>
      Log in
    </Button>
  {/if}
</main>
