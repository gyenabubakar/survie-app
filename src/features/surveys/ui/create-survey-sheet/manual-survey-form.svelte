<script lang="ts" module>
type InfoIconProps = Record<string, unknown>;
</script>

<script lang="ts">
import { fly } from 'svelte/transition';
import { Question } from 'phosphor-svelte';
import { zodClient } from 'sveltekit-superforms/adapters';
import type { SuperValidated } from 'sveltekit-superforms';
import { Checkbox } from 'shadcn/checkbox';
import * as Form from 'shadcn/form';
import { Input } from 'shadcn/input';
import { Separator } from 'shadcn/separator';
import { Textarea } from 'shadcn/textarea';
import { manualFormSchema } from '#features/surveys/schemas';
import { Button, TooltipWrapper } from '#components';
import { FormFieldErrors } from '#components/forms';
import { SUPER_FORM_COMMON_OPTIONS } from '#lib/constants';
import { createSuperForm } from '#lib/forms';
import type { ManualFormSchema } from '#features/surveys/schemas';
import Back from './back.svelte';
import { SURVEY_SETTINGS_FIELDS } from './utils';

type Props = {
  form: SuperValidated<ManualFormSchema>;
};

let { form: superValidatedForm }: Props = $props();

const superForm = createSuperForm(superValidatedForm, {
  validators: zodClient(manualFormSchema),
  ...SUPER_FORM_COMMON_OPTIONS,
});

const { form, submitting, enhance } = superForm;

const isValidForm = $derived(manualFormSchema.safeParse($form).success);
</script>

<form
  method="post"
  action="?/createSurvey"
  class="w-full"
  autocomplete="off"
  use:enhance
  in:fly={{ delay: 150, x: 100, duration: 300 }}
>
  <Form.Field form={superForm} name="title">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Survey title</Form.Label>
        <Input {...props} bind:value={$form.title} />
      {/snippet}
    </Form.Control>
    <FormFieldErrors />
  </Form.Field>

  <Form.Field form={superForm} name="description">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Survey description</Form.Label>
        <Textarea {...props} bind:value={$form.description} />
      {/snippet}
    </Form.Control>
    <FormFieldErrors />
  </Form.Field>

  <Separator class="mb-3 mt-5" />

  <p class="mb-3 text-sm">Survey settings</p>

  {#each SURVEY_SETTINGS_FIELDS as field (field.name)}
    <Form.Field form={superForm} name={field.name}>
      <Form.Control>
        {#snippet children({ props })}
          <div class="flex gap-2">
            <Checkbox {...props} bind:checked={$form[field.name]} />

            <Form.Label class="-mt-0.5">
              <span>{field.label}</span>
              <TooltipWrapper class="max-w-[200px]" message={field.tooltip}>
                {#snippet children({ props })}
                  {@render infoIcon(props)}
                {/snippet}
              </TooltipWrapper>
            </Form.Label>
          </div>
        {/snippet}
      </Form.Control>
      <FormFieldErrors />
    </Form.Field>
  {/each}

  <Button
    type="submit"
    class="mt-4"
    loading={$submitting}
    disabled={!isValidForm}
    aria-label={$submitting ? 'Creating survey, please wait' : 'Create survey'}
  >
    Create survey
  </Button>

  <Back />
</form>

{#snippet infoIcon(props: InfoIconProps)}
  <Question {...props} weight="fill" size="14" class="inline-block text-gray-400" />
{/snippet}
