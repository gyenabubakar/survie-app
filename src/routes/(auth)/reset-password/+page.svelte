<script lang="ts">
import { enhance } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button, FormMessage, FormValidationError } from '#components';
import { formFieldErrors, formSchema as schema } from '#lib/form-schemas/reset-password';
import { fieldIsValid } from '#lib/form-schemas/utils';

let { form } = $props();

let email = $state(form?.data?.email ?? '');
let submitting = $state(false);

let isValidEmail = $derived(fieldIsValid(schema, 'email', email));
let canSubmitForm = $derived(!!isValidEmail && !submitting);

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

        {#if isValidEmail === false || !!form?.validationErrors?.email}
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

  <p class="mt-12 text-center text-slate-500">
    Back to <a href="/log-in">log in page</a>.
  </p>
</main>
