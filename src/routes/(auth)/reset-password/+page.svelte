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

    <Button
      type="submit"
      disabled={submitting}
      aria-live="polite"
      aria-label={!submitting ? undefined : 'Sending verification email, please wait'}
    >
      {#if !submitting}
        Send verification email
      {:else}
        <Loading size="23px" aria-hidden="true" />
      {/if}
    </Button>
  </form>

  <p class="text-slate-500 text-center mt-12">
    Back to <a href="/log-in">log in page</a>.
  </p>
</main>
