<script lang="ts">
  import { slide, type SlideParams } from 'svelte/transition';
  import { ArrowLeft } from 'phosphor-svelte';
  import { Sheet, SheetTrigger, SheetContent } from 'shadcn-ui/sheet';

  let form: 'ai-form' | 'manual-form' | undefined = undefined;

  function fadeSlide(node: HTMLElement, options?: SlideParams) {
    const slideTrans = slide(node, options);
    return {
      duration: options?.duration ?? 300,
      css: (t: number) => `
				${slideTrans?.css?.(t, 0)}
				opacity: ${t};
			`,
    };
  }
</script>

<Sheet>
  <SheetTrigger asChild let:builder>
    <slot builders={[builder]} />
  </SheetTrigger>
  <SheetContent class="sm:max-w-md">
    {#if form}
      <button
        class="absolute left-4 top-4 flex items-center text-blue-500 hover:text-blue-700"
        aria-label="Back"
        on:click={() => (form = undefined)}
      >
        <ArrowLeft size={18} class="mr-1" aria-hidden />
        <span class="leading-4 mt-0.5 text-sm">Back</span>
      </button>
    {/if}

    {#if form === undefined}
      <div class="form-selectors" transition:fadeSlide>
        <p class="text-2xl font-medium mt-8 mb-4">Create new survey</p>

        <div
          class="pseudo-btn"
          role="button"
          tabindex="0"
          aria-label="Create your survey with AI"
          on:click={() => (form = 'ai-form')}
          on:keyup
        >
          <enhanced:img
            src="#assets/tabs.svg"
            alt="tabs illustration"
            class="w-16"
            aria-hidden="true"
          />
          <div class="description">
            <p>Create your survey with AI</p>
            <p>
              Give a brief description of your product and the focus of your survey and let AI do
              the rest.
            </p>
          </div>
        </div>
        <div
          class="pseudo-btn"
          role="button"
          tabindex="0"
          aria-label="Manually create your survey"
          on:click={() => (form = 'manual-form')}
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
            <p>
              Have full control when creating all your questions, question types and survey options.
            </p>
          </div>
        </div>
      </div>
    {:else if form === 'manual-form'}
      <div transition:fadeSlide>Manual Form</div>
    {:else}
      <div transition:fadeSlide>AI Form</div>
    {/if}
  </SheetContent>
</Sheet>

<style lang="postcss">
  .pseudo-btn {
    @apply flex h-max cursor-pointer items-center rounded-md border border-slate-200 p-6;
    @apply shadow-lg shadow-slate-100 hover:shadow-none;

    &:not(:last-child) {
      @apply mb-4;
    }

    .description {
      @apply flex-grow pl-5 text-sm;

      p {
        @apply leading-[14px];

        &:first-child {
          @apply font-bold;
        }
        &:last-child {
          @apply mt-1.5 text-gray-500;
        }
      }
    }
  }
</style>
