<script lang="ts">
  import { fly } from 'svelte/transition';
  import { getSheetContext } from './utils';

  const { form } = getSheetContext();
</script>

<div class="form-options" transition:fly={{ x: -100, duration: 300 }}>
  <div
    class="pseudo-btn"
    role="button"
    tabindex="0"
    aria-label="Create your survey with AI"
    on:click={() => form.set('ai-form')}
    on:keyup
  >
    <enhanced:img src="#assets/tabs.svg" alt="tabs illustration" class="w-16" aria-hidden="true" />
    <div class="description">
      <p>Create your survey with AI</p>
      <p>
        Give a brief description of your product and the focus of your survey and let AI do the
        rest.
      </p>
    </div>
  </div>

  <div
    class="pseudo-btn"
    role="button"
    tabindex="0"
    aria-label="Manually create your survey"
    on:click={() => form.set('manual-form')}
    on:keyup
  >
    <enhanced:img
      src="#assets/typewriter.svg"
      alt="tabs illustration"
      class="w-16"
      aria-hidden="true"
    />
    <div class="description">
      <p>Manually create your survey</p>
      <p>Have full control when creating all your questions, question types and survey options.</p>
    </div>
  </div>
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
