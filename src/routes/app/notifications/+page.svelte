<script lang="ts">
import { Card } from 'shadcn/card';
import { NotificationsContext } from '#features/notifications/context';
import { Notification } from '#features/notifications/ui';
import { Container } from '#components';

const notifications = NotificationsContext.use();
</script>

<svelte:head>
  <title>Notifications | Survie</title>
</svelte:head>

<Container size="md">
  <h1>Notifications</h1>

  <Card class="px-8 py-4">
    {#each notifications.all as notification (notification.id)}
      <Notification large {...notification} />
    {/each}
  </Card>
</Container>
