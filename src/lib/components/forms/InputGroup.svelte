<script lang="ts">
	interface Props {
		gap?: number;
		classname?: string;
		children?: any;
	}

	const { children, classname, gap = 2 }: Props = $props();
</script>

<div class={`input-group flex flex-col ${`gap-${gap}`} ${classname}`}>
	{@render children?.()}
</div>
