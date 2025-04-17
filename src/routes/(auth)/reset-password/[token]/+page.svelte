<script lang="ts">
import { enhance } from '$app/forms';
import { goto } from '$app/navigation';
import type { SubmitFunction } from '@sveltejs/kit';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button, FormMessage, FormValidationError } from '#components';
import { formFieldErrors } from '#lib/form-schemas/new-password';

let { form } = $props();

let password = $state('');
let password2 = $state('');
let submitting = $state(false);

let isValidPassword = $derived(password ? password.length >= 8 : null);
let isValidPassword2 = $derived(password2 ? password2.length >= 8 : null);
let passwordsMatch = $derived(password === password2);
let showingPasswordMismatchError = $derived(!passwordsMatch && isValidPassword && isValidPassword2);
let canSubmitForm = $derived(
  !!isValidPassword && !!isValidPassword2 && !!passwordsMatch && !submitting,
);

const handleSubmit: SubmitFunction = ({ cancel }) => {
  if (!canSubmitForm) return cancel();
  submitting = true;

  if (form?.validationErrors) form.validationErrors = undefined;
  if (form?.error) form.error = undefined;

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
  <p class="mb-6 text-sm text-gray-500">
    Set a new password for your account: <strong>john@doe.com</strong>.
  </p>

  {#if form?.error}
    <FormMessage>{form.error}</FormMessage>
  {:else if form?.success}
    <FormMessage variant="success">You've changed your password successfully.</FormMessage>
  {/if}

  {#if !form?.success}
    <form method="post" use:enhance={handleSubmit}>
      <div class="form-group">
        <Label for="password">New Password</Label>
        <Input type="password" id="password" name="password" required bind:value={password} />

        {#if isValidPassword === false || form?.validationErrors?.password}
          {@const message = form?.validationErrors?.password ?? formFieldErrors.password}
          <FormValidationError {message} />
        {/if}
      </div>

      <div class="form-group">
        <Label for="confirm-password">Confirm Password</Label>
        <Input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          required
          bind:value={password2}
        />

        {#if showingPasswordMismatchError}
          <FormValidationError message="Passwords do not match." />
        {:else if isValidPassword2 === false || form?.validationErrors?.password}
          {@const message = form?.validationErrors?.confirmPassword ?? formFieldErrors.password}
          <FormValidationError {message} />
        {/if}
      </div>

      <Button
        type="submit"
        disabled={!canSubmitForm}
        loading={submitting}
        aria-label={!submitting ? 'Change password' : 'Changing password, please wait'}
      >
        Change password
      </Button>
    </form>
  {/if}

  {#if form?.success}
    <Button
      type="button"
      role="link"
      class="w-full"
      aria-live="polite"
      onclick={() => goto('/log-in')}
    >
      Log in
    </Button>
  {/if}
</main>
