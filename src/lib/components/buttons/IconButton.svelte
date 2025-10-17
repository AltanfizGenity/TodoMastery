<script lang="ts">
	interface IconButtonProps {
		Icon: SvelteComponent;
		text?: string;
		class?: string;
		type?: 'button' | 'submit' | 'reset';
		onclick?: () => void;
	}

	let { type = 'button', class: classname = '', onclick, Icon, text }: IconButtonProps = $props();

	function handleClick() {
		onclick?.();
	}
</script>

{#if text}
	<button
		onclick={handleClick}
		class={`${classname} flex items-center gap-2 group hover:text-amber-500 cursor-pointer`}
		{type}
	>
		<div class="icon w-4 h-4">
			<Icon />
		</div>
		<p class="capitalize text-gray-500 group-hover:text-amber-500">{text}</p>
	</button>
{:else}
	<button
		onclick={handleClick}
		class={`${classname} flex items-center justify-center hover:text-amber-500 w-6 h-6 cursor-pointer`}
		{type}
	>
		<Icon />
	</button>
{/if}
