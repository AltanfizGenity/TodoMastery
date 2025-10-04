<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
</script>

<h1>Login to Todomastery</h1>
<form method="POST" use:enhance action="?/login">
	<input type="email" name="email" placeholder="example@mail.com" required />
	<input type="password" name="password" placeholder="password" required />
	<button type="submit">Login</button>
</form>

{#if page.form?.message}
	<p>{page.form.message}</p>
{/if}
