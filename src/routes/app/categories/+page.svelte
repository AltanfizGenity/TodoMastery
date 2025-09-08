<script lang="ts">
	import BaseButton from '$lib/components/buttons/BaseButton.svelte';
	import { isCreatingCategory } from '$lib/store/appstate';
	import { categories } from '$lib/store/userdata';

	function deleteCategory() {
		// categories.update((categories) => categories.filter((category) => category !== categoryName));
	}

	function openCategoryForm() {
		isCreatingCategory.set(true);
	}
</script>

<div class="todo-container flex flex-col gap-8">
	<h1 class="text-2xl font-bold capitalize">Manage your categories</h1>
	<ul class="category-list relative">
		{#each $categories as category}
			<li class="flex justify-between w-128 max-w-3/4">
				<div class="property flex gap-2">
					<div class="title">{category.name}</div>
				</div>
				<div class="actions">
					<button>edit</button>
					<button onclick={() => deleteCategory()}>delete</button>
				</div>
			</li>
		{/each}
	</ul>
	<div class="action flex gap-4">
		<BaseButton text="add category" type="button" variant="primary" onClick={openCategoryForm} />
	</div>
</div>
