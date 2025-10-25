<script lang="ts">
	interface InputProps {
		title: string;
		preventEmpty?: boolean;
		onTitleChange?: (newTitle: string) => void;
	}

	let { title = $bindable(), preventEmpty = false, onTitleChange }: InputProps = $props();
	let previousTitle = $state(title);

	const handleTitleChange = (event: Event) => {
		let newTitle = (event.target as HTMLInputElement).value.trim();

		if (!newTitle && preventEmpty) {
			title = previousTitle;
			return;
		}

		previousTitle = newTitle;
		onTitleChange?.(newTitle);
	};
</script>

<input
	class="text-2xl w-full outline-none"
	bind:value={title}
	required
	placeholder="your todo title"
	onblur={handleTitleChange}
/>
