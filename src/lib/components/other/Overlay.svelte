<script lang="ts">
	interface OverlayProps extends Props {
		isActive: boolean;
		onClosed: () => void;
	}

	let { children, ...props }: OverlayProps = $props();
</script>

<div class="overlay gaussian-blur">
	{@render children()}
</div>

<style>
	.overlay {
		position: fixed;
		width: 100%;
		min-height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 101;
	}

	.overlay.gaussian-blur {
		backdrop-filter: blur(5px);
	}
</style>
