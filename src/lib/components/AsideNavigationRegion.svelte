<script lang="ts">
	interface RegionProps extends Props {
		title?: string;
	}

	let { title, children }: RegionProps = $props();
</script>

<div class="region-bar w-full">
	{#if title}
		<h3 class="region-title text-sm capitalize text-gray-400 p-1.5">{title}</h3>
	{/if}
	{@render children()}
</div>
