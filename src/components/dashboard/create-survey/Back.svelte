<script lang="ts">
  import { getSheetContext } from './utils';

  const { form } = getSheetContext();
</script>

{#if $form}
  <div class="flex justify-center mt-6">
    <button
      class="flex items-center text-gray-400 text-sm font-medium"
      aria-label="Back"
      on:click={() => form.set(undefined)}
    >
      Back to options
    </button>
  </div>
{/if}
