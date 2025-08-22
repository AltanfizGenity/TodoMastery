<script lang="ts">
	import { categories } from '$lib/store/userdata';
	import Overlay from './Overlay.svelte';

	interface CategoryFormProps {
		isOpen: boolean;
		onClose: () => void;
		onCreate?: (newCategory: string) => void;
	}

	let categoryInput = $state('');
	let { isOpen, onClose, onCreate }: CategoryFormProps = $props();

	function createCategory(event: SubmitEvent) {
		event.preventDefault();
		categories.update((categories) => [...categories, categoryInput]);
		onCreate?.(categoryInput);
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
