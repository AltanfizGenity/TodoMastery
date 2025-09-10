<script lang="ts">
	interface IconButtonProps {
		Icon: SvelteComponent;
		class?: string;
		type?: 'button' | 'submit' | 'reset';
		onclick?: () => void;
	}

	let { type = 'button', class: classname = '', onclick, Icon }: IconButtonProps = $props();

	function handleClick() {
		onclick?.();
	}
</script>

<button
	onclick={handleClick}
	class={`${classname} flex items-center justify-center hover:text-amber-500 w-6 h-6 cursor-pointer`}
	{type}
>
	<Icon />
</button>
