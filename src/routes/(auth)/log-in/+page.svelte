<script lang="ts">
import { zodClient } from 'sveltekit-superforms/adapters';
import * as Form from 'shadcn/form';
import { Input } from 'shadcn/input';
import { loginSchema } from '#features/auth/schemas';
import { Button } from '#components';
import { FormFieldErrors, FormMessage, PasswordInput } from '#components/forms';
import { SUPER_FORM_COMMON_OPTIONS } from '#lib/constants';
import { createSuperForm } from '#lib/forms';

let { data } = $props();

const superForm = createSuperForm(data.form, {
  validators: zodClient(loginSchema),
  ...SUPER_FORM_COMMON_OPTIONS,
});

const { form, submitting, message, enhance } = superForm;

const isValidForm = $derived(loginSchema.safeParse($form).success);
</script>

<svelte:head>
  <title>Log in | Survie</title>
</svelte:head>

<main>
  <h1>Log in</h1>

  {#if $message?.status === 'success' || $message?.status === 'error'}
    <FormMessage variant={$message.status}>{$message.text}</FormMessage>
  {/if}

  <form method="post" use:enhance class="grid gap-3">
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
          <div class="flex justify-between">
            <Form.Label>Password</Form.Label>
            <a href="/reset-password">Forgot password?</a>
          </div>

          <PasswordInput {...props} bind:value={$form.password} />
        {/snippet}
      </Form.Control>
      <FormFieldErrors />
    </Form.Field>

    <Button
      type="submit"
      disabled={!isValidForm}
      loading={$submitting}
      aria-label={!$submitting ? 'Log in' : 'Logging in, please wait'}
    >
      Log in
    </Button>
  </form>

  <p class="mt-12 text-center text-slate-500">
    Don't have an account? <a href="/sign-up">Sign up instead</a>.
  </p>
</main>
