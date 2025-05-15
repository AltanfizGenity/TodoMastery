<script lang="ts">
	import TodoForm from '$lib/components/forms/TodoForm.svelte';
	import AppSidebar from '$lib/components/navbars/AppSidebar.svelte';
	import { isSearchboxOpen, isTodoFormOpen } from '$lib/stores/app.store';

	let { children } = $props();
</script>

<div class="app-layout">
	<AppSidebar />
	<div class="app">
		{@render children()}
	</div>
	{#if $isTodoFormOpen}
		<TodoForm />
	{/if}
	{#if $isSearchboxOpen}
		<p>Searchbox</p>
	{/if}
</div>
ss

<style>
	.app-layout {
		display: flex;
	}

	.app {
		width: 100%;
	}
</style>
