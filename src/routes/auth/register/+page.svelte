<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
</script>

<form method="POST" use:enhance>
	<input name="username" type="text" placeholder="username" required />
	<input name="email" type="email" placeholder="email" required />
	<input name="password" type="password" placeholder="password" required />
	<button type="submit">Register</button>
</form>

{#if page.form?.message}
	<p>{page.form.message}</p>
{/if}
