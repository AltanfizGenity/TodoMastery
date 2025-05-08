<script lang="ts">
	interface CustomButtonProps {
		type: 'button' | 'submit' | 'reset' | null | undefined;
		variant: 'primary' | 'secondary' | 'muted';
		disabled: boolean;
		class: string;
		onclick?: (event: MouseEvent) => void;
		[key: string]: any;
	}

	let { children, type, variant, disabled, class: extendClass }: CustomButtonProps = $props();
</script>

<button {type} class={`custom-button ${extendClass} ${variant}`} {disabled}>
	{@render children()}
</button>
