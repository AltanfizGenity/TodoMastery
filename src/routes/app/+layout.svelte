<script lang="ts">
	import AsideNavigation from '$lib/components/AsideNavigation.svelte';

	let { children } = $props();
</script>

<div class="app-container flex min-h-screen h-screen">
	<AsideNavigation />
	<main>
		{@render children()}
	</main>
</div>
