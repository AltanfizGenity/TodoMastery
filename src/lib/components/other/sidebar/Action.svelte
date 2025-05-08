<script lang="ts">
	interface SidebarActionProps extends IconButtonProps {
		isActive: boolean;
	}
	let { Icon, class: classname, text, isActive, ...props }: SidebarActionProps = $props();
</script>

<button class={`sidebar-action action ${isActive ? 'current' : ''} ${classname}`} {...props}>
	<div class="icon">
		<Icon />
	</div>
	<div class="text">
		{text}
	</div>
</button>

<style>
	.sidebar-action {
		width: 100%;
		padding: var(--padding-2);
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.sidebar-action:hover {
		background: #eee;
	}

	.sidebar-action.current {
		background: rgba(216, 65, 65, 0.1);
		color: var(--color-primary);
	}

	.icon {
		width: 1.2rem;
		height: 1.2rem;
	}
</style>
