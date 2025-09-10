<script lang="ts">
	import { createCategoryDB } from '$lib/api/db/category/create';
	import type { Category, NewCategory } from '$lib/database/server/schema/categories-schema';
	import { categories } from '$lib/store/userdata';
	import Overlay from './Overlay.svelte';

	interface CategoryFormProps {
		isOpen: boolean;
		onClose: () => void;
		onCreate?: (newCategory: Category) => void;
	}

	let categoryInput = $state('');
	let { isOpen, onClose, onCreate }: CategoryFormProps = $props();

	async function createCategory(event: SubmitEvent) {
		event.preventDefault();
		const newCategory: NewCategory = {
			name: categoryInput
		};
		let result = await createCategoryDB(newCategory);

		if (!result.success) {
			console.log('create category failed: ', result.errorMessage);
			return;
		}

		let yieldedCategory = result.data as Category;
		categories.update((categories) => [...categories, yieldedCategory]);
		onCreate?.(yieldedCategory);
		closeForm();
	}

	function closeForm() {
		onClose();
		resetForm();
	}

	function resetForm() {
		categoryInput = '';
	}
</script>

<Overlay {isOpen} onClosed={() => {}} index={110}>
	<form
		onsubmit={createCategory}
		class="gap-4 p-4 bg-gray-50 flex flex-col w-1/2 rounded-xl absolute top-1/4"
	>
		<h1 class="text-xl text-center font-bold">New Category</h1>
		<div class="input-group">
			<input
				type="text"
				placeholder="ex: work, personal"
				bind:value={categoryInput}
				required
				class="outline-0"
			/>
		</div>
		<div class="action flex justify-end gap-4">
			<button
				class="bg-gray-100 text-black capitalize py-1 px-4 cursor-pointer"
				type="button"
				onclick={closeForm}>cancel</button
			>
			<button class="bg-amber-400 text-black capitalize py-1 px-4 cursor-pointer" type="submit"
				>create</button
			>
		</div>
	</form>
</Overlay>
