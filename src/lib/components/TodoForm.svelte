<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { categories } from '$lib/store/userdata';
	import { DateTime } from 'luxon';
	import Overlay from './Overlay.svelte';
	import { isTodoFormOpen } from '$lib/store/appstate';

	let title = $state('');
	let dueDate = $state('');
	let category = $state<string | null>(null);
	let categoryInput = $state('');
	let isCreatingCategory = $state(false);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		let newTodo: Todo = {
			id: crypto.randomUUID(),
			title: title,
			completed: false,
			dueDate: dueDate || null,
			category
		};

		todos.update((todos) => [...todos, newTodo]);
		closeForm();
	}

	function handleCategoryInputChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		if (target.value === 'create-new-categories') {
			isCreatingCategory = true;
			category = null;
		}
	}

	function createCategory(event: SubmitEvent) {
		event.preventDefault();
		categoryInput = categoryInput.trim();
		if (!categoryInput) return;
		categories.update((currentcategories) => {
			let newcategories = currentcategories.includes(categoryInput)
				? currentcategories
				: [...currentcategories, categoryInput];
			category = categoryInput;
			return newcategories;
		});
		categoryInput = '';
		isCreatingCategory = false;
	}

	function closeForm() {
		isTodoFormOpen.set(false);
	}
</script>

{#if isCreatingCategory}
	<form onsubmit={createCategory}>
		<input type="text" placeholder="new categories" bind:value={categoryInput} required />
		<button type="submit">create category</button>
	</form>
{/if}

<Overlay isOpen={$isTodoFormOpen} onClosed={() => {}}>
	<form
		class="todo-form gap-4 p-4 bg-gray-50 flex flex-col w-1/2 rounded-xl absolute top-1/4"
		onsubmit={handleSubmit}
	>
		<div class="input-group">
			<input
				type="text"
				placeholder="your todo title"
				bind:value={title}
				required
				class="outline-0"
			/>
		</div>
		<div class="input-group">
			<input type="date" bind:value={dueDate} min={DateTime.now().toISODate()} />
			<select
				name="category"
				id="category"
				bind:value={category}
				onchange={handleCategoryInputChange}
			>
				<option value={null}>no category</option>
				{#each $categories as category}
					<option value={category}>{category}</option>
				{/each}
				<option value="create-new-categories">+ new category</option>
			</select>
		</div>
		<div class="action flex justify-end gap-4">
			<button
				class="bg-gray-100 text-black capitalize py-1 px-4 cursor-pointer"
				type="button"
				onclick={closeForm}>cancel</button
			>
			<button class="bg-amber-400 text-black capitalize py-1 px-4 cursor-pointer" type="submit"
				>add todo</button
			>
		</div>
	</form>
</Overlay>
