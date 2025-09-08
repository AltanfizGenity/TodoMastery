<script lang="ts">
	import { isCreatingCategory } from '$lib/store/appstate';
	import { categories } from '$lib/store/userdata';

	interface InputProps {
		categoryId: number | null;
		onInputChange?: (categortyId: number) => void;
	}

	let { onInputChange, categoryId = $bindable() }: InputProps = $props();

	function handleCategoryInputChange(event: Event) {
		let selectedCategory = (event.target as HTMLSelectElement).value;
		if (selectedCategory === 'create-new-categories') {
			isCreatingCategory.set(true);
			return;
		}
		onInputChange?.(Number(selectedCategory));
	}
</script>

<select name="category" id="category" oninput={handleCategoryInputChange} bind:value={categoryId}>
	<option value={null}>no category</option>
	{#each $categories as category}
		<option value={category.id}>{category.name}</option>
	{/each}
	<option value="create-new-categories">+ new category</option>
</select>
