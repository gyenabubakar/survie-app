<script lang="ts">
import { Card } from 'shadcn/card';
import { useNotificationStore } from '#features/notifications/stores';
import { Notification } from '#features/notifications/ui';
import { Container } from '#components';

const { notifications } = useNotificationStore();
</script>

<svelte:head>
  <title>Notifications | Survie</title>
</svelte:head>

<main>
  <Container size="md">
    <h1>Notifications</h1>

    <Card class="px-8 py-4">
      {#each $notifications as notification (notification.id)}
        <Notification large {...notification} />
      {/each}
    </Card>
  </Container>
</main>
