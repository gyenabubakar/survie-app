<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Label, Button, Input, Checkbox } from 'shadcn-ui';
  import { enhance } from '$app/forms';
  import { formFieldErrors, formSchema } from '#lib/form-schemas/sign-up';
  import { FormValidationError, FormMessage, PasswordInput } from '#components';
  import { fieldIsValid } from '#lib/form-schemas/utils';

  export let form;

  let firstName = form?.data?.firstName ?? '';
  let lastName = form?.data?.lastName ?? '';
  let email = form?.data?.email ?? '';
  let password = '';

  let agreedToTerms = form?.data?.agreedToTerms === 'on';
  let submitting = false;
  let showAgreedToTermsError = false;

  $: fnameIsValid = fieldIsValid(formSchema, 'firstName', firstName);
  $: lnameIsValid = fieldIsValid(formSchema, 'lastName', lastName);
  $: emailIsValid = fieldIsValid(formSchema, 'email', email);
  $: passwordIsValid = fieldIsValid(formSchema, 'password', password);
  $: textFieldsAreValid = !!fnameIsValid && !!lnameIsValid && !!emailIsValid && !!passwordIsValid;
  $: canSubmitForm = textFieldsAreValid && agreedToTerms && !submitting;

  const handleSubmit: SubmitFunction = ({ cancel }) => {
    if (!agreedToTerms) {
      showAgreedToTermsError = true;
      return cancel();
    }
    if (!canSubmitForm) return cancel();
    submitting = true;

    if (form?.validationErrors) {
      form.validationErrors = null;
      showAgreedToTermsError = false;
    }

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

  {#if form && 'error' in form}
    <FormMessage>{form.error}</FormMessage>
  {:else if form?.success}
    <FormMessage variant="success">
      Your account has been created. Please check your email to verify your account.
    </FormMessage>
  {/if}

  <form method="post" use:enhance={handleSubmit}>
    <div class="flex gap-4">
      <div class="form-group">
        <Label for="first-name">First name</Label>
        <Input
          type="text"
          id="first-name"
          name="firstName"
          placeholder="Gyen"
          bind:value={firstName}
          required
        />

        {#if fnameIsValid === false || !!form?.validationErrors?.firstName}
          {@const message = form?.validationErrors?.firstName ?? formFieldErrors.firstName}
          <FormValidationError {message} />
        {/if}
      </div>

      <div class="form-group">
        <Label for="last-name">Last name</Label>
        <Input
          type="text"
          id="last-name"
          name="lastName"
          placeholder="Abubakar"
          bind:value={lastName}
          required
        />

        {#if lnameIsValid === false || !!form?.validationErrors?.lastName}
          {@const message = form?.validationErrors?.lastName ?? formFieldErrors.lastName}
          <FormValidationError {message} />
        {/if}
      </div>
    </div>

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

    <div class="form-group">
      <Label for="password">Password</Label>
      <PasswordInput
        id="password"
        name="password"
        placeholder="******"
        bind:value={password}
        required
      />

      {#if passwordIsValid === false || !!form?.validationErrors?.password}
        {@const message = form?.validationErrors?.password ?? formFieldErrors.password}
        <FormValidationError {message} />
      {/if}
    </div>

    <div
      class="form-group space-x-2"
      class:no-mb={showAgreedToTermsError || !!form?.validationErrors?.agreedToTerms}
    >
      <Checkbox
        id="terms"
        bind:checked={agreedToTerms}
        inputAttrs={{ id: 'terms-input', name: 'agreedToTerms' }}
      />
      <Label for="terms">I agree to the <a href="/#">terms of use</a>.</Label>
    </div>

    {#if showAgreedToTermsError || !!form?.validationErrors?.agreedToTerms}
      <FormValidationError message={formFieldErrors.agreedToTerms} class="mb-4" />
    {/if}

    <Button
      type="submit"
      disabled={!canSubmitForm}
      loading={submitting}
      aria-label={!submitting ? 'Create Account' : 'Creating, please wait'}
    >
      Create Account
    </Button>
  </form>

  <p class="text-slate-500 text-center mt-12">
    Already have an account? <a href="/log-in">Log in instead</a>.
  </p>
</main>
