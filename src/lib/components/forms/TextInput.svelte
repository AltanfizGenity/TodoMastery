<script lang="ts">
	interface InputProps {
		text: string;
		preventEmpty?: boolean;
		placeholder?: string;
		onchange?: (newText: string) => void;
		class?: string;
	}

	let {
		text = $bindable(),
		preventEmpty = false,
		onchange,
		placeholder = '',
		class: classname
	}: InputProps = $props();
	let previousTitle = $state(text);

	const handleChange = (event: Event) => {
		let newText = (event.target as HTMLInputElement).value.trim();

		if (!newText && preventEmpty) {
			text = previousTitle;
			return;
		}

		previousTitle = newText;
		onchange?.(newText);
	};
</script>

<input
	class={`${classname} w-full outline-none`}
	bind:value={text}
	required
	{placeholder}
	onblur={handleChange}
/>
