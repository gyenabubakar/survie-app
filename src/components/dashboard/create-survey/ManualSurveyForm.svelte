<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Question } from 'phosphor-svelte';
  import { Checkbox, Input, Label, Button } from 'shadcn-ui';
  import { Textarea } from 'shadcn-ui/textarea';
  import { Tooltip, TooltipTrigger, TooltipContent } from 'shadcn-ui/tooltip';
  import Back from './Back.svelte';

  let title = '';
  let description = '';
  let multiplePages = false;
  let collectUserInfo = false;
</script>

<form in:fly={{ delay: 150, x: 100, duration: 300 }} class="w-full" autocomplete="off">
  <div class="form-group">
    <Label for="survey-title">Survey title</Label>
    <Input type="text" id="survey-title" name="surveyTitle" bind:value={title} required />
  </div>

  <div class="form-group">
    <Label for="survey-description">Survey description</Label>
    <Textarea id="survey-description" bind:value={description} />

    <small class="text-gray-500">
      The above fields will be shown to people taking part in the survey.
    </small>
  </div>

  <p class="text-sm mb-3">Survey settings</p>
  <div class="form-group space-x-2 flex items-center" style="margin-bottom: 10px">
    <Checkbox
      bind:checked={multiplePages}
      inputAttrs={{ id: 'multiple-pages-input', name: 'multiplePages' }}
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
      bind:checked={collectUserInfo}
      inputAttrs={{ id: 'collect-user-info-input', name: 'collectUserInfo' }}
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

  <Button type="submit" class="mt-4">Create survey</Button>

  <Back />
</form>
