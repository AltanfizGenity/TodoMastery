<script lang="ts">
	import { isCreatingCategory } from '$lib/store/appstate';
	import { categories } from '$lib/store/userdata';

	interface InputProps {
		category: string | null;
		onInputChange?: (newCategory: string) => void;
	}

	let { category = $bindable(), onInputChange }: InputProps = $props();

	function handleCategoryInputChange(event: Event) {
		const newCategory = (event.target as HTMLSelectElement).value;
		if (newCategory === 'create-new-categories') {
			isCreatingCategory.set(true);
			category = null;
		}
		onInputChange?.(newCategory);
	}
</script>

<select name="category" id="category" bind:value={category} oninput={handleCategoryInputChange}>
	<option value={null}>no category</option>
	{#each $categories as category}
		<option value={category}>{category}</option>
	{/each}
	<option value="create-new-categories">+ new category</option>
</select>
