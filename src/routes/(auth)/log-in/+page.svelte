<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Label, Button, Input } from 'shadcn-ui';
  import { enhance } from '$app/forms';
  import { formFieldErrors, formSchema as schema } from '#lib/form-schemas/log-in';
  import { FormValidationError, FormMessage, PasswordInput } from '#components';
  import { fieldIsValid } from '#lib/form-schemas/utils';

  export let form;

  let email = form?.data?.email ?? '';
  let password = '';
  let submitting = false;

  $: emailIsValid = fieldIsValid(schema, 'email', email);
  $: passwordIsValid = fieldIsValid(schema, 'password', password);
  $: canSubmitForm = !!emailIsValid && !!passwordIsValid && !submitting;

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

      {#if emailIsValid === false || form?.validationErrors?.email}
        {@const message = form?.validationErrors?.email ?? formFieldErrors.email}
        <FormValidationError {message} />
      {/if}
    </div>

    <div class="form-group">
      <div class="flex justify-between">
        <Label for="password">Password</Label>
        <a href="/reset-password">Forgot password?</a>
      </div>
      <PasswordInput
        id="password"
        name="password"
        required
        placeholder="******"
        bind:value={password}
      />

      {#if passwordIsValid === false || form?.validationErrors?.password}
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

  <p class="text-slate-500 text-center mt-12">
    Don't have an account? <a href="/sign-up">Sign up instead</a>.
  </p>
</main>
