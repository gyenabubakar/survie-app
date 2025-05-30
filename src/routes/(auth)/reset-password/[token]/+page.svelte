<script lang="ts">
import { zodClient } from 'sveltekit-superforms/adapters';
import * as Form from 'shadcn/form';
import { Input } from 'shadcn/input';
import { resetPasswordSchema } from '#features/auth/schemas';
import { Button } from '#components';
import { FormFieldErrors, FormMessage } from '#components/forms';
import { SUPER_FORM_COMMON_OPTIONS } from '#lib/constants';
import { createSuperForm } from '#lib/forms';

let { data } = $props();

const superForm = createSuperForm(data.form, {
  validators: zodClient(resetPasswordSchema),
  ...SUPER_FORM_COMMON_OPTIONS,
});

const { form, submitting, message, enhance } = superForm;

const isValidForm = $derived(resetPasswordSchema.safeParse($form).success);
</script>

<svelte:head>
  <title>Reset Password | Survie</title>
</svelte:head>

<main>
  <h1 style="margin-bottom: 0;">Reset Password</h1>
  <p class="mb-6 text-sm text-gray-500">
    Set a new password for your account: <strong>john@doe.com</strong>.
  </p>

  {#if $message?.status === 'error'}
    <FormMessage>{$message.text}</FormMessage>
  {:else if $message?.status === 'success'}
    <FormMessage variant="success">You've changed your password successfully.</FormMessage>
  {:else}
    <form method="post" use:enhance class="grid gap-1">
      <Form.Field form={superForm} name="password">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>New Password</Form.Label>
            <Input {...props} type="password" bind:value={$form.password} />
          {/snippet}
        </Form.Control>
        <FormFieldErrors />
      </Form.Field>

      <Form.Field form={superForm} name="confirmPassword">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Confirm Password</Form.Label>
            <Input {...props} type="password" bind:value={$form.confirmPassword} />
          {/snippet}
        </Form.Control>
        <FormFieldErrors />
      </Form.Field>

      <Button
        type="submit"
        disabled={!isValidForm}
        loading={$submitting}
        aria-label={!$submitting ? 'Change password' : 'Changing password, please wait'}
        class="mt-4"
      >
        Change password
      </Button>
    </form>
  {/if}

  {#if $message?.status === 'success'}
    <Button type="button" class="w-full" variant="ghost" href="/log-in">Log in</Button>
  {/if}
</main>
