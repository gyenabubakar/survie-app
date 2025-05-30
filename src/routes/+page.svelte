<script lang="ts">
import { goto } from '$app/navigation';
import { Button } from 'shadcn/button';
</script>

<Button onclick={() => goto('/sign-up')}>Sign up</Button>
