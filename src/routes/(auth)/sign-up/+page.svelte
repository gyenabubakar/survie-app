<script lang="ts">
import { zodClient } from 'sveltekit-superforms/adapters';
import { Checkbox } from 'shadcn/checkbox';
import * as Form from 'shadcn/form';
import { Input } from 'shadcn/input';
import { signupSchema } from '#features/auth/schemas';
import { Button } from '#components';
import { FormFieldErrors, FormMessage, PasswordInput } from '#components/forms';
import { SUPER_FORM_COMMON_OPTIONS } from '#lib/constants';
import { createSuperForm } from '#lib/forms';

let { data } = $props();

const superForm = createSuperForm(data.form, {
  validators: zodClient(signupSchema),
  ...SUPER_FORM_COMMON_OPTIONS,
});

const { form, submitting, message, enhance } = superForm;

const isValidForm = $derived(signupSchema.safeParse($form).success);
</script>

<svelte:head>
  <title>Sign up | Survie</title>
</svelte:head>

<main>
  <h1>Sign up</h1>

  {#if $message?.status === 'error'}
    <FormMessage>{$message.text}</FormMessage>
  {:else if $message?.status === 'success'}
    <FormMessage variant="success">
      Your account has been created. Please check your email to verify your account.
    </FormMessage>
  {/if}

  <form method="post" use:enhance class="grid gap-1">
    <div class="flex gap-4">
      <Form.Field form={superForm} name="firstName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>First name</Form.Label>
            <Input {...props} type="text" placeholder="Gyen" bind:value={$form.firstName} />
          {/snippet}
        </Form.Control>
        <FormFieldErrors />
      </Form.Field>

      <Form.Field form={superForm} name="lastName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Last name</Form.Label>
            <Input {...props} type="text" placeholder="Abubakar" bind:value={$form.lastName} />
          {/snippet}
        </Form.Control>
        <FormFieldErrors />
      </Form.Field>
    </div>

    <Form.Field form={superForm} name="email">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Email</Form.Label>
          <Input {...props} type="email" placeholder="name@company.com" bind:value={$form.email} />
        {/snippet}
      </Form.Control>
      <FormFieldErrors />
    </Form.Field>

    <Form.Field form={superForm} name="password">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label for="password">Password</Form.Label>
          <PasswordInput {...props} placeholder="******" bind:value={$form.password} />
        {/snippet}
      </Form.Control>
      <FormFieldErrors />
    </Form.Field>

    <Form.Field form={superForm} name="agreedToTerms" class="form-group space-x-2">
      <Form.Control>
        {#snippet children({ props })}
          <Checkbox {...props} bind:checked={$form.agreedToTerms} />
          <Form.Label>I agree to the <a href="/#">terms of use</a>.</Form.Label>
        {/snippet}
      </Form.Control>
      <FormFieldErrors />
    </Form.Field>

    <Button
      type="submit"
      disabled={!isValidForm}
      loading={$submitting}
      aria-label={!$submitting ? 'Create Account' : 'Creating, please wait'}
    >
      Create Account
    </Button>
  </form>

  <p class="mt-12 text-center text-slate-500">
    Already have an account? <a href="/log-in">Log in instead</a>.
  </p>
</main>
