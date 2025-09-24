<script lang="ts">
	import { todos } from '$lib/store/todo';
	import Overlay from './Overlay.svelte';
	import { isCreatingCategory, isTodoFormOpen } from '$lib/store/appstate';

	import BaseButton from './buttons/BaseButton.svelte';
	import TodoCategoryInput from './forms/TodoCategoryInput.svelte';
	import TodoTitleInput from './forms/TodoTitleInput.svelte';
	import TodoDeadlineInput from './forms/TodoDeadlineInput.svelte';
	import type { NewTodo } from '$lib/database/server/schema/todos-schema';
	import { createTodoDB } from '$lib/api/db/todos/create';
	import { categories } from '$lib/store/userdata';

	let title = $state('');
	let dueDate = $state('');
	let categoryId = $state<number | null>(null);

	$effect(() => {
		if (!$isCreatingCategory) {
			categoryId = null;
		}
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		let category = $categories.find((category) => category.id === categoryId);
		let newTodo: NewTodo = {
			title,
			dueDate: dueDate || null,
			category_id: category?.id || null
		};

		let result = await createTodoDB(newTodo);
		if (!result.success) {
			alert('There something error on server');
		} else {
			let newTodos = result.data!;
			todos.update((currentTodos) => [...currentTodos, ...newTodos]);
		}

		closeForm();
	}

	function closeForm() {
		isTodoFormOpen.set(false);
	}
</script>

<Overlay isOpen={$isTodoFormOpen} onClosed={() => {}}>
	<form
		class="todo-form gap-4 p-4 bg-gray-50 flex flex-col w-1/2 rounded-xl absolute top-1/4"
		onsubmit={handleSubmit}
	>
		<div class="input-group">
			<TodoTitleInput onTitleChange={(newTitle) => (title = newTitle)} {title} />
		</div>
		<div class="input-group">
			<TodoDeadlineInput bind:dueDate />
			<TodoCategoryInput
				onInputChange={(newCategoryId) => (categoryId = newCategoryId)}
				bind:categoryId
			/>
		</div>
		<div class="action flex justify-end gap-4">
			<BaseButton text="cancel" type="button" variant="secondary" onClick={closeForm} />
			<BaseButton text="add todos" type="submit" variant="primary" />
		</div>
	</form>
</Overlay>
