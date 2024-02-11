<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { Label, Button, Input, Checkbox } from '#shadcn-ui';
  import FormValidationError from '#components/FormValidationError.svelte';
  import Loading from '#components/Loading.svelte';

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
  <title>Sign up | Survie</title>
</svelte:head>

<main>
  <h1>Sign up</h1>

  <form method="post" use:enhance={handleSubmit}>
    <div class="flex gap-4">
      <div class="form-field">
        <Label for="first-name">First name</Label>
        <Input
          type="text"
          id="first-name"
          name="firstName"
          placeholder="Gyen"
          value={form?.data?.firstName ?? ''}
          required
        />
        <FormValidationError message={form?.validationErrors?.firstName} />
      </div>

      <div class="form-field">
        <Label for="last-name">Last name</Label>
        <Input
          type="text"
          id="last-name"
          name="lastName"
          placeholder="Abubakar"
          value={form?.data?.lastName ?? ''}
          required
        />
        <FormValidationError message={form?.validationErrors?.lastName} />
      </div>
    </div>

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
      <Label for="password">Password</Label>
      <Input type="password" id="password" name="password" placeholder="******" required />
      <FormValidationError message={form?.validationErrors?.password} />
    </div>

    <div class="form-field space-x-2" class:no-mb={!!form?.validationErrors?.agreedToTerms}>
      <Checkbox
        id="terms"
        checked={form?.data.agreedToTerms === 'on'}
        inputAttrs={{ id: 'terms-input', name: 'agreedToTerms' }}
      />
      <Label for="terms">I agree to the <a href="/#">terms of use</a>.</Label>
    </div>
    <FormValidationError class="mb-4" message={form?.validationErrors?.agreedToTerms} />

    <Button
      type="submit"
      disabled={submitting}
      aria-live="polite"
      aria-label={!submitting ? undefined : 'Signing up, please wait'}
    >
      {#if !submitting}
        Create Account
      {:else}
        <Loading size="23px" aria-hidden="true" />
      {/if}
    </Button>
  </form>

  <p class="text-slate-500 text-center mt-12">
    Already have an account? <a href="/login">Log in instead</a>.
  </p>
</main>
