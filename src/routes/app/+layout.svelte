<script lang="ts">
	import QuickAddButton from '$lib/components/buttons/AddButton.svelte';
	import { InboxIcon } from '$lib/components/icons';
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
		<p>Todo form</p>
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
