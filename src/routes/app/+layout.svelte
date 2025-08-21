<script lang="ts">
	import AsideNavigation from '$lib/components/AsideNavigation.svelte';
	import TodoForm from '$lib/components/TodoForm.svelte';

	let { children } = $props();
</script>

<div class="app-container flex min-h-screen h-screen">
	<AsideNavigation />
	<main class="px-16 py-8 flex-1">
		{@render children()}
	</main>
	<TodoForm />
</div>
