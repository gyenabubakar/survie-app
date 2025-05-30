<script lang="ts">
import { zodClient } from 'sveltekit-superforms/adapters';
import * as Form from 'shadcn/form';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { forgotPasswordSchema } from '#features/auth/schemas';
import { Button } from '#components';
import { FormFieldErrors, FormMessage } from '#components/forms';
import { SUPER_FORM_COMMON_OPTIONS } from '#lib/constants';
import { createSuperForm } from '#lib/forms';

let { data } = $props();

const superForm = createSuperForm(data.form, {
  validators: zodClient(forgotPasswordSchema),
  ...SUPER_FORM_COMMON_OPTIONS,
});

const { form, submitting, message, enhance } = superForm;

const isValidForm = $derived(forgotPasswordSchema.safeParse($form).success);
</script>

<svelte:head>
  <title>Reset Password | Survie</title>
</svelte:head>

<main>
  <h1>Reset Password</h1>

  {#if $message?.status === 'error'}
    <FormMessage>{$message.text}</FormMessage>
  {:else if $message?.status === 'success'}
    <FormMessage variant="success">
      We sent you an email to verify that it's you.<br />
      Follow the link in the email to reset your password.
    </FormMessage>
  {:else}
    <form method="post" use:enhance class="grid gap-1">
      <Form.Field form={superForm} name="email" class="form-group">
        <Form.Control>
          {#snippet children({ props })}
            <Label>Email</Label>
            <Input
              {...props}
              type="email"
              placeholder="name@company.com"
              bind:value={$form.email}
            />
          {/snippet}
        </Form.Control>
        <FormFieldErrors />
      </Form.Field>

      <Button
        type="submit"
        disabled={!isValidForm}
        loading={$submitting}
        aria-label={!$submitting
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
