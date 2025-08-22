<script lang="ts">
	interface OverlayProps extends Props {
		index?: number;
		isOpen: boolean;
		onClosed: () => void;
	}

	let { isOpen, children, index }: OverlayProps = $props();
</script>

{#if isOpen}
	<div
		class={`overlay fixed w-full min-h-screen inset-0 flex justify-center items-center bg-gray-800/25 backdrop-blur-sm ${
			index ? `z-[${index}]` : 'z-100'
		}`}
	>
		{@render children()}
	</div>
{/if}
