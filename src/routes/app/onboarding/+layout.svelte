<script lang="ts">
  import { Logo, Container } from '#components';
</script>

<div class="layout">
  <nav class="py-8">
    <Container wider>
      <Logo />
    </Container>
  </nav>

  <slot />
</div>
