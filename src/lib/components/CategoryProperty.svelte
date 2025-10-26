<script lang="ts">
	import type { Category } from '$lib/database/server/schema/categories-schema';
	import { categoryPropertyId } from '$lib/store/appstate';
	import { categories } from '$lib/store/userdata';
	import BaseButton from './buttons/BaseButton.svelte';
	import InputGroup from './forms/InputGroup.svelte';
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
			<InputGroup>
				<TextInput
					text={selectedCategory.name}
					placeholder="category name"
					onchange={changeCategoryName}
				/>
			</InputGroup>
			<div class="action flex justify-end gap-4">
				<BaseButton text="close" variant="secondary" onClick={closeModal} />
			</div>
		</div>
	</Overlay>
{/if}
