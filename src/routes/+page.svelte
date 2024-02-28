<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '#shadcn-ui/button';
</script>

<Button on:click={() => goto('/sign-up')}>Sign up</Button>
