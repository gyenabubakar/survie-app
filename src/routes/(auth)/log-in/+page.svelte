<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { Label, Button, Input } from '#shadcn-ui';
  import { FormValidationError, FormMessage, Loading } from '#components';

  export let form;

  let submitting = false;

  const handleSubmit: SubmitFunction = ({ cancel }) => {
    if (submitting) return cancel();
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
    <div class="form-field">
      <Label for="email">Email</Label>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="name@company.com"
        value={form?.data?.email ?? ''}
        required
      />
      <FormValidationError message={form?.validationErrors?.email} />
    </div>

    <div class="form-field">
      <div class="flex justify-between">
        <Label for="password">Password</Label>
        <a href="/reset-password">Forgot password?</a>
      </div>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="******"
        required
        canTogglePasswordVisibility
      />
      <FormValidationError message={form?.validationErrors?.password} />
    </div>

    <Button
      type="submit"
      disabled={submitting}
      aria-live="polite"
      aria-label={!submitting ? undefined : 'Logging in, please wait'}
    >
      {#if !submitting}
        Log in
      {:else}
        <Loading size="23px" aria-hidden="true" />
      {/if}
    </Button>
  </form>

  <p class="text-slate-500 text-center mt-12">
    Don't have an account? <a href="/sign-up">Sign up instead</a>.
  </p>
</main>
