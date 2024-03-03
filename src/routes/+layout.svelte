<script>
  import '../app.pcss';
  import { Toaster } from 'shadcn-ui/sonner';
</script>

<Toaster richColors closeButton toastOptions={{ duration: 5000 }} />

<slot />
