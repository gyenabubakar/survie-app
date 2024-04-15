<script lang="ts">
  import { Card, CardContent } from 'shadcn-ui/card';
  import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'shadcn-ui/select';
  import { page } from '$app/stores';
  import { Container } from '#components';
  import { Input, Label } from 'shadcn-ui';

  console.log($page);
</script>

<svelte:head>
  <title>Create survey question — New Feature Survey | Survie</title>
</svelte:head>

<main>
  <Container size="lg">
    <div class="flex items-center justify-between">
      <h1>Question 1</h1>
      <span class="text-sm text-gray-400">New Feature Survey</span>
    </div>

    <Card>
      <CardContent class="py-6 px-8">
        <form method="post">
          <div class="form-group">
            <Label for="question">Question</Label>
            <Input id="question" name="question" />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="form-field">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a question type" />
                </SelectTrigger>
                <SelectContent></SelectContent>
              </Select>
            </div>
            <div class="form-field"></div>
          </div>
        </form>
      </CardContent>
    </Card>
  </Container>
</main>
