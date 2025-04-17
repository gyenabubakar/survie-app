<script lang="ts">
import { getSheetContext } from './utils';

const { activeForm } = getSheetContext();
</script>

{#if $activeForm}
  <div class="mt-6 flex justify-center">
    <button
      class="flex items-center text-sm font-medium text-gray-400"
      aria-label="Back"
      onclick={() => activeForm.set(undefined)}
    >
      Back to options
    </button>
  </div>
{/if}
