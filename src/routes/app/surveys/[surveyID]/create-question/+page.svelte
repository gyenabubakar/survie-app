<script lang="ts">
import { page } from '$app/state';
import { Card, CardContent } from 'shadcn/card';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Select, SelectContent, SelectTrigger } from 'shadcn/select';
import { Container } from '#components';

console.log(page);
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
      <CardContent class="px-8 py-6">
        <form method="post">
          <div class="form-group">
            <Label for="question">Question</Label>
            <Input id="question" name="question" />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="form-field">
              <Select type="single">
                <SelectTrigger>Choose a question type</SelectTrigger>
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
