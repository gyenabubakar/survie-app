<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Question } from 'phosphor-svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Checkbox, Input, Label, Button } from 'shadcn-ui';
  import { Textarea } from 'shadcn-ui/textarea';
  import { Tooltip, TooltipTrigger, TooltipContent } from 'shadcn-ui/tooltip';
  import { enhance } from '$app/forms';
  import { manualFormSchema as schema } from '#lib/form-schemas/new-survey';
  import { manualFormFieldErrors as fieldErrors } from '#lib/form-schemas/new-survey';
  import { fieldIsValid } from '#lib/form-schemas/utils';
  import { FormValidationError } from '#components';
  import { getDashboardFormContext, getSheetContext } from './utils';
  import Back from './Back.svelte';

  const { manualFormData: form } = getSheetContext();
  const { actionData } = getDashboardFormContext();

  let submitting = false;

  $: titleIsValid = fieldIsValid(schema, 'title', $form.title);
  $: descriptionIsValid = fieldIsValid(schema, 'description', $form.description);
  $: canSubmitForm = titleIsValid && descriptionIsValid && !submitting;

  const handleSubmit: SubmitFunction = ({ cancel }) => {
    if (!canSubmitForm) return cancel();
    submitting = true;

    if ($actionData?.action === 'createSurvey' && $actionData?.validationErrors) {
      $actionData.validationErrors = null;
    }

    return async ({ update }) => {
      await update();
      submitting = false;
    };
  };
</script>

<form
  method="post"
  action="?/createSurvey"
  class="w-full"
  autocomplete="off"
  use:enhance={handleSubmit}
  in:fly={{ delay: 150, x: 100, duration: 300 }}
>
  <div class="form-group">
    <Label for="survey-title" required>Survey title</Label>
    <Input type="text" id="survey-title" name="title" bind:value={$form.title} required />

    {#if titleIsValid === false || $actionData?.validationErrors?.title}
      {@const message = $actionData?.validationErrors?.title ?? fieldErrors.title}
      <FormValidationError {message} />
    {/if}
  </div>

  <div class="form-group">
    <Label for="survey-description">Survey description</Label>
    <Textarea id="survey-description" name="description" bind:value={$form.description} />

    {#if descriptionIsValid === false || $actionData?.validationErrors?.description}
      {@const message = $actionData?.validationErrors?.description ?? fieldErrors.description}
      <FormValidationError {message} />
    {:else}
      <small class="text-gray-500">
        The above fields will be shown to people taking part in the survey.
      </small>
    {/if}
  </div>

  <p class="text-sm mb-3">Survey settings</p>
  <div class="form-group space-x-2 flex items-center" style="margin-bottom: 10px">
    <Checkbox
      inputAttrs={{ id: 'multiple-pages-input', name: 'multiplePages', value: $form.multiplePages }}
    />
    <Label for="multiple-pages-input" class="mt-0.5">
      <span>Show questions over multiple pages.</span>
      <Tooltip>
        <TooltipTrigger>
          <Question
            weight="fill"
            size="14"
            class="text-gray-400 inline-block"
            role="button"
            tabindex={0}
          />
        </TooltipTrigger>
        <TooltipContent class="max-w-[200px]">
          By default, all questions show on a single page. Enabling this option will show the
          questions over multiple pages. (1 question per page)
        </TooltipContent>
      </Tooltip>
    </Label>
  </div>

  <div class="form-group space-x-2 flex items-center">
    <Checkbox
      inputAttrs={{
        id: 'collect-user-info-input',
        name: 'collectUserInfo',
        value: $form.collectUserInfo,
      }}
    />
    <Label for="collect-user-info-input" class="mt-0.5">
      <span>Attempt to collect user info from participant.</span>
      <Tooltip>
        <TooltipTrigger>
          <Question
            weight="fill"
            size="14"
            class="text-gray-400 inline-block"
            role="button"
            tabindex={0}
          />
        </TooltipTrigger>
        <TooltipContent class="max-w-[200px]">
          Enabling this option will attempt to collect user information from the participant. This
          includes their name, email, and other details.
        </TooltipContent>
      </Tooltip>
    </Label>
  </div>

  <Button type="submit" class="mt-4" loading={submitting} disabled={!canSubmitForm}>
    Create survey
  </Button>

  <Back />
</form>
