<script lang="ts">
	import { isCreatingCategory } from '$lib/store/appstate';
	import { categories } from '$lib/store/userdata';

	interface InputProps {
		category: string | null;
	}

	let { category = $bindable() }: InputProps = $props();

	function handleCategoryInputChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		if (target.value === 'create-new-categories') {
			isCreatingCategory.set(true);
			category = null;
		}
	}
</script>

<select name="category" id="category" bind:value={category} onchange={handleCategoryInputChange}>
	<option value={null}>no category</option>
	{#each $categories as category}
		<option value={category}>{category}</option>
	{/each}
	<option value="create-new-categories">+ new category</option>
</select>
