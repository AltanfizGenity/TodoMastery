<script lang="ts">
	let { text = 'Add task', disabled = false, ...props }: ButtonProps = $props();
</script>

<button class="quick-add-button icon-text-button" {...props}>
	<div class="icon">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
			><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg
		>
	</div>
	<div class="text">{text}</div>
</button>

<style>
	.quick-add-button:hover {
		color: var(--color-primary);

		.icon {
			background-color: var(--color-primary);
			color: #fff;
		}
	}

	.icon {
		background-color: transparent;
		border-radius: 50%;
	}
</style>
