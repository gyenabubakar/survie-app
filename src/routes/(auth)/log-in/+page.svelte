<script lang="ts">
import { enhance } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';
import { Button } from 'shadcn/button';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { FormMessage, FormValidationError, PasswordInput } from '#components';
import { formFieldErrors, formSchema as schema } from '#lib/form-schemas/log-in';
import { fieldIsValid } from '#lib/form-schemas/utils';

let { form } = $props();

let email = $state(form?.data?.email ?? '');
let password = $state('');
let submitting = $state(false);

let isValidEmail = $derived(fieldIsValid(schema, 'email', email));
let isValidPassword = $derived(fieldIsValid(schema, 'password', password));
let canSubmitForm = $derived(!!isValidEmail && !!isValidPassword && !submitting);

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
  <title>Log in | Survie</title>
</svelte:head>

<main>
  <h1>Log in</h1>

  {#if form && 'error' in form}
    <FormMessage>{form.error}</FormMessage>
  {/if}

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

      {#if isValidEmail === false || form?.validationErrors?.email}
        {@const message = form?.validationErrors?.email ?? formFieldErrors.email}
        <FormValidationError {message} />
      {/if}
    </div>

    <div class="form-group">
      <div class="flex justify-between">
        <Label for="password">Password</Label>
        <a href="/reset-password">Forgot password?</a>
      </div>

      <PasswordInput id="password" name="password" required bind:value={password} />

      {#if isValidPassword === false || form?.validationErrors?.password}
        {@const message = form?.validationErrors?.password ?? formFieldErrors.password}
        <FormValidationError {message} />
      {/if}
      <FormValidationError message={form?.validationErrors?.password} />
    </div>

    <Button
      type="submit"
      disabled={!canSubmitForm}
      loading={submitting}
      aria-label={!submitting ? 'Log in' : 'Logging in, please wait'}
    >
      Log in
    </Button>
  </form>

  <p class="mt-12 text-center text-slate-500">
    Don't have an account? <a href="/sign-up">Sign up instead</a>.
  </p>
</main>
