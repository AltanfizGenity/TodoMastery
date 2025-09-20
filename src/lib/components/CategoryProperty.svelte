<script lang="ts">
	import type { Category } from '$lib/database/server/schema/categories-schema';
	import { categoryPropertyId } from '$lib/store/appstate';
	import { categories } from '$lib/store/userdata';
	import TextInput from './forms/TextInput.svelte';
	import Overlay from './Overlay.svelte';

	let selectedCategory = $state<Category | null>(null);

	$effect(() => {
		selectedCategory = $categories.find((category) => category.id === $categoryPropertyId) || null;
	});

	const closeModal = () => categoryPropertyId.set(null);

	const changeCategoryName = (newName: string) => {
		// TODO: update to database

		categories.update((current) => {
			return current.map((category) => {
				if (category.id === selectedCategory?.id) {
					return { ...category, name: newName };
				}
				return category;
			});
		});
	};
</script>

{#if selectedCategory}
	<Overlay isOpen={selectedCategory !== null} onClosed={() => {}} index={110}>
		<div class="gap-4 p-4 bg-gray-50 flex flex-col w-1/2 rounded-xl absolute top-1/4">
			<h1 class="text-xl text-center font-bold">Edit Category</h1>
			<div class="input-group">
				<TextInput
					text={selectedCategory.name}
					placeholder="category name"
					onchange={changeCategoryName}
				/>
			</div>
			<div class="action flex justify-end gap-4">
				<button
					class="bg-gray-100 text-black capitalize py-1 px-4 cursor-pointer"
					type="button"
					onclick={closeModal}>close</button
				>
			</div>
		</div>
	</Overlay>
{/if}
