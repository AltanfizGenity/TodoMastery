<script lang="ts">
	import { deleteCategoryDB } from '$lib/api/db/category/delete';
	import type { Category } from '$lib/database/server/schema/categories-schema';
	import { categoryPropertyId } from '$lib/store/appstate';
	import { categories } from '$lib/store/userdata';
	import IconButton from './buttons/IconButton.svelte';
	import { EditBoxLine, TrashLine } from './icons/line';

	interface CategoryItemProps {
		currentCategory: Category;
	}

	let { currentCategory }: CategoryItemProps = $props();

	async function deleteCategory() {
		let result = await deleteCategoryDB(currentCategory.id);

		if (!result.success) {
			console.log('delete category failed: ', result.errorMessage);
			return;
		}

		categories.update((categories) =>
			categories.filter((category) => category.id !== currentCategory.id)
		);
	}

	function editCategory() {
		categoryPropertyId.set(currentCategory.id);
	}
</script>

<li class="flex justify-between w-128 max-w-3/4 group px-4 py-2 hover:bg-gray-50">
	<div class="property flex gap-2">
		<div class="title capitalize">{currentCategory.name}</div>
	</div>
	<div class="actions gap-2 hidden group-hover:flex">
		<IconButton Icon={EditBoxLine} onclick={editCategory} />
		<IconButton Icon={TrashLine} onclick={deleteCategory} />
	</div>
</li>
