<script lang="ts">
	interface BaseButtonProps {
		text: string;
		class?: string;
		variant: 'primary' | 'secondary';
		type?: 'button' | 'submit' | 'reset';
		onClick?: () => void;
	}

	let variantTailwindClasses = {
		primary: 'bg-amber-400 text-gray-800 hover:bg-amber-500',
		secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
	};

	let {
		text,
		variant,
		type = 'button',
		class: classname = '',
		onClick
	}: BaseButtonProps = $props();

	function handleClick() {
		onClick?.();
	}
</script>

<button
	onclick={handleClick}
	class={`${classname} ${variantTailwindClasses[variant]} capitalize py-1 px-4 cursor-pointer rounded-lg`}
	{type}>{text}</button
>
