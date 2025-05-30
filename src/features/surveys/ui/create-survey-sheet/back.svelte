<script lang="ts">
import { CreateSurveySheetContext } from './context.svelte';

const ctx = CreateSurveySheetContext.use();
</script>

<div class="mt-6 flex justify-center">
  <button
    class="flex items-center text-sm font-medium text-gray-400"
    aria-label="Back"
    onclick={() => (ctx.activeForm = undefined)}
  >
    Back to options
  </button>
</div>
