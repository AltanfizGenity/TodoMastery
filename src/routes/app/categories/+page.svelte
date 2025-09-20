<script lang="ts">
	import BaseButton from '$lib/components/buttons/BaseButton.svelte';
	import CategoryItem from '$lib/components/CategoryItem.svelte';
	import CategoryProperty from '$lib/components/CategoryProperty.svelte';
	import { isCreatingCategory } from '$lib/store/appstate';
	import { categories } from '$lib/store/userdata';

	function openCategoryForm() {
		isCreatingCategory.set(true);
	}
</script>

<div class="category-container flex flex-col gap-8">
	<h1 class="text-2xl font-bold capitalize">Manage your categories</h1>
	<ul class="category-list relative">
		{#if $categories.length === 0}
			<h2 class="text-gray-400">You don't have any category</h2>
		{:else}
			{#each $categories as category}
				<CategoryItem currentCategory={category} />
			{/each}
		{/if}
	</ul>
	<div class="action flex gap-4">
		<BaseButton text="add category" type="button" variant="primary" onClick={openCategoryForm} />
	</div>
</div>

<CategoryProperty />
