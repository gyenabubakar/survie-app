<script lang="ts">
  import { z } from 'zod';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Label, Button, Input } from 'shadcn-ui';
  import { enhance } from '$app/forms';
  import { formFieldErrors } from '#lib/form-schemas/reset-password';
  import { FormValidationError, FormMessage } from '#components';

  export let form;

  let email = form?.data?.email ?? '';
  let submitting = false;

  $: emailIsValid = email ? z.string().email().safeParse(email).success : null;
  $: canSubmitForm = !!emailIsValid && !submitting;

  const handleSubmit: SubmitFunction = ({ cancel }) => {
    if (!canSubmitForm) return cancel();
    submitting = true;

    if (form?.validationErrors) form.validationErrors = null;

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
  <h1>Reset Password</h1>

  {#if form && 'error' in form}
    <FormMessage>{form.error}</FormMessage>
  {:else if form?.success}
    <FormMessage variant="success">
      We sent you an email to verify that it's you.<br />
      Follow the link in the email to reset your password.
    </FormMessage>
  {/if}

  {#if !form?.success}
    <form method="post" use:enhance={handleSubmit}>
      <div class="form-group">
        <Label for="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="name@company.com"
          bind:value={email}
          required
        />

        {#if emailIsValid === false || !!form?.validationErrors?.email}
          {@const message = form?.validationErrors?.email ?? formFieldErrors.email}
          <FormValidationError {message} />
        {/if}
      </div>

      <Button
        type="submit"
        disabled={!canSubmitForm}
        loading={submitting}
        aria-label={!submitting
          ? 'Send verification email'
          : 'Sending verification email, please wait'}
      >
        Send verification email
      </Button>
    </form>
  {/if}

  <p class="text-slate-500 text-center mt-12">
    Back to <a href="/log-in">log in page</a>.
  </p>
</main>
