<script lang="ts">
  import { Label, Button, Input, Checkbox } from '#shadcn-ui';
</script>

<main>
  <h1>Sign up</h1>

  <form method="post">
    <div class="flex gap-4">
      <div class="form-field">
        <Label for="first-name">First name</Label>
        <Input type="text" id="first-name" placeholder="Gyen" required />
      </div>

      <div class="form-field">
        <Label for="last-name">Last name</Label>
        <Input type="text" id="last-name" placeholder="Abubakar" required />
      </div>
    </div>

    <div class="form-field">
      <Label for="email">Email</Label>
      <Input type="email" id="email" placeholder="name@company.com" required />
    </div>

    <div class="form-field">
      <Label for="password">Password</Label>
      <Input type="password" id="password" placeholder="******" required />
    </div>

    <div class="form-field space-x-2">
      <Checkbox id="terms" required />
      <Label for="terms">I agree to the <a href="/#">terms of use</a>.</Label>
    </div>

    <Button type="submit">Create Account</Button>
  </form>

  <p class="text-slate-500 text-center mt-12">
    Already have an account? <a href="/login">Log in instead</a>.
  </p>
</main>
