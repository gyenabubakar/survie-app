<script lang="ts">
import '../app.pcss';

import { Toaster } from 'shadcn/sonner';

let { children } = $props();
</script>

<Toaster position="top-right" duration={7_000} visibleToasts={100} richColors closeButton expand />

{@render children?.()}
