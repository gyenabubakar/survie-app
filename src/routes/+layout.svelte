<script lang="ts">
  import '../app.pcss';
  import { Toaster } from 'shadcn-ui/sonner';

  let { children } = $props();
</script>

<Toaster richColors closeButton toastOptions={{ duration: 5000 }} />

{@render children?.()}
