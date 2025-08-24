<script lang="ts">
	interface OverlayProps extends Props {
		index?: number;
		isOpen: boolean;
		onClosed: () => void;
	}

	let { isOpen, children, index = 100 }: OverlayProps = $props();
</script>

{#if isOpen}
	<div
		class={`overlay fixed w-full min-h-screen inset-0 flex justify-center items-center bg-gray-800/25 backdrop-blur-sm`}
		style:z-index={index}
	>
		{@render children()}
	</div>
{/if}
