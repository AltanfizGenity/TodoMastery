<script lang="ts">
	import QuickAddButton from '$lib/components/buttons/AddButton.svelte';
	import { InboxIcon } from '$lib/components/icons';
	import AppSidebar from '$lib/components/navbars/AppSidebar.svelte';

	let { children } = $props();
</script>

<div class="app-layout">
	<AppSidebar />
	<div class="app">
		{@render children()}
	</div>
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
