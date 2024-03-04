<script lang="ts">
  import { Card } from 'shadcn-ui/card';
  import { Container } from '#components';
  import { Notification } from '#components/dashboard';
  import { useNotificationStore } from '#lib/stores/notifications';

  const { notifications } = useNotificationStore();
</script>

<svelte:head>
  <title>Notifications | Survie</title>
</svelte:head>

<main>
  <Container size="md">
    <h1>Notifications</h1>

    <Card class="py-4 px-8">
      {#each $notifications as notification (notification.id)}
        <Notification large {...notification} />
      {/each}
    </Card>
  </Container>
</main>
