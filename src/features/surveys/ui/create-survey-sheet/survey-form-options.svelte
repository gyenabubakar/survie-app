<script lang="ts">
import { fly } from 'svelte/transition';
import { FORM_CREATION_OPTIONS } from '#features/surveys/ui/create-survey-sheet/utils';
import { CreateSurveySheetContext } from './context.svelte';

const ctx = CreateSurveySheetContext.use();
</script>

<div class="form-options" transition:fly={{ x: -100, duration: 300 }}>
  {#each FORM_CREATION_OPTIONS as option (option.name)}
    <div
      class="pseudo-btn"
      role="button"
      tabindex="0"
      aria-label={option.label}
      onclick={() => (ctx.activeForm = option.name)}
      onkeyup={() => {}}
    >
      {#if option.name === 'ai-form'}
        <enhanced:img
          src="#assets/tabs.svg"
          alt="tabs illustration"
          class="w-16"
          aria-hidden="true"
        />
      {:else if option.name === 'manual-form'}
        <enhanced:img
          src="#assets/typewriter.svg"
          alt="tabs illustration"
          class="w-16"
          aria-hidden="true"
        />
      {/if}

      <div class="description">
        <p>{option.label}</p>
        <p>
          {option.description}
        </p>
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
.pseudo-btn {
  @apply flex h-max cursor-pointer items-center rounded-md border border-slate-200 p-6;
  @apply shadow-lg shadow-slate-100 hover:shadow-none;

  &:not(:last-child) {
    @apply mb-4;
  }

  .description {
    @apply flex-grow pl-5;

    p {
      @apply leading-[14px];

      &:first-child {
        @apply font-bold;
      }

      &:last-child {
        @apply mt-1.5 text-sm text-gray-500;
      }
    }
  }
}
</style>
