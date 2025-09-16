<script lang="ts">
	import type { Category } from '$lib/database/server/schema/categories-schema';
	import { categories } from '$lib/store/userdata';
	import IconButton from './buttons/IconButton.svelte';
	import { EditBoxLine, TrashLine } from './icons/line';

	interface CategoryItemProps {
		currentCategory: Category;
	}

	let { currentCategory }: CategoryItemProps = $props();

	function deleteCategory() {
		// TODO : implement category deletion on database

		categories.update((categories) =>
			categories.filter((category) => category.id !== currentCategory.id)
		);
	}
</script>

<li class="flex justify-between w-128 max-w-3/4 group px-4 py-2 hover:bg-gray-50">
	<div class="property flex gap-2">
		<div class="title capitalize">{currentCategory.name}</div>
	</div>
	<div class="actions gap-2 hidden group-hover:flex">
		<IconButton Icon={EditBoxLine} />
		<IconButton Icon={TrashLine} onclick={deleteCategory} />
	</div>
</li>
