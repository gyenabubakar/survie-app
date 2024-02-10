<script lang="ts">
  import { Label, Button, Input, Checkbox } from '#shadcn-ui';

  export let form;
</script>

<main>
  <h1>Sign up</h1>

  <form method="post">
    <div class="flex gap-4">
      <div class="form-field">
        <Label for="first-name">First name</Label>
        <Input
          type="text"
          id="first-name"
          name="firstName"
          placeholder="Gyen"
          value={form?.data?.firstName ?? ''}
          required
        />
      </div>

      <div class="form-field">
        <Label for="last-name">Last name</Label>
        <Input
          type="text"
          id="last-name"
          name="lastName"
          placeholder="Abubakar"
          value={form?.data?.lastName ?? ''}
          required
        />
      </div>
    </div>

    <div class="form-field">
      <Label for="email">Email</Label>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="name@company.com"
        value={form?.data?.email ?? ''}
        required
      />
    </div>

    <div class="form-field">
      <Label for="password">Password</Label>
      <Input type="password" id="password" name="password" placeholder="******" required />
    </div>

    <div class="form-field space-x-2">
      <Checkbox
        id="terms"
        checked={form?.data.agreedToTerms === 'on'}
        inputAttrs={{ id: 'terms-input', name: 'agreedToTerms' }}
      />
      <Label for="terms">I agree to the <a href="/#">terms of use</a>.</Label>
    </div>

    <Button type="submit">Create Account</Button>
  </form>

  <p class="text-slate-500 text-center mt-12">
    Already have an account? <a href="/login">Log in instead</a>.
  </p>
</main>
