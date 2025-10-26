<script lang="ts">
	import { createCategoryDB } from '$lib/api/db/category/create';
	import type { Category, NewCategory } from '$lib/database/server/schema/categories-schema';
	import { categories } from '$lib/store/userdata';
	import { trapFocus } from '$lib/utils/svelte/action.svelte';
	import Overlay from './Overlay.svelte';
	import { page } from '$app/state';
	import type { User } from '$lib/database/server/schema/users';
	import TextInput from './forms/TextInput.svelte';
	import BaseButton from './buttons/BaseButton.svelte';

	let user = page.data.user as User;

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
			name: categoryInput.toLowerCase(),
			user_id: user.id
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
		use:trapFocus
	>
		<h1 class="text-xl text-center font-bold">New Category</h1>
		<div class="input-group">
			<TextInput bind:text={categoryInput} placeholder="ex: work, personal" />
		</div>
		<div class="action flex justify-end gap-4">
			<BaseButton text="cancel" variant="secondary" type="button" onClick={closeForm} />
			<BaseButton text="create" variant="primary" type="submit" />
		</div>
	</form>
</Overlay>
