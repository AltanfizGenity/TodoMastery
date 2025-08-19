<script lang="ts">
	interface OverlayProps extends Props {
		isOpen: boolean;
		onClosed: () => void;
	}

	let { isOpen, children }: OverlayProps = $props();
</script>

{#if isOpen}
	<div
		class="overlay fixed w-full min-h-screen inset-0 flex justify-center items-center z-100 bg-gray-800/25 backdrop-blur-sm"
	>
		{@render children()}
	</div>
{/if}
