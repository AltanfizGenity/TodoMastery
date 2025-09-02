<script lang="ts">
	import { todos } from '$lib/store/todo';
	import Overlay from './Overlay.svelte';
	import { isCreatingCategory, isTodoFormOpen } from '$lib/store/appstate';
	import CategoryForm from './CategoryForm.svelte';
	import BaseButton from './buttons/BaseButton.svelte';
	import TodoCategoryInput from './forms/TodoCategoryInput.svelte';
	import TodoTitleInput from './forms/TodoTitleInput.svelte';
	import TodoDeadlineInput from './forms/TodoDeadlineInput.svelte';
	import type { NewTodo } from '$lib/database/server/schema/todos-schema';
	import { createTodoIntoDatabase } from '$lib/api/db/todos/create';

	let title = $state('');
	let dueDate = $state('');
	let category = $state<string | null>(null);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		let newTodo: NewTodo = {
			title,
			dueDate: dueDate || null,
			category
		};

		// request database update to the server
		let result = await createTodoIntoDatabase(newTodo);

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

<CategoryForm
	isOpen={$isCreatingCategory}
	onClose={() => isCreatingCategory.set(false)}
	onCreate={(newCategory) => {
		category = newCategory;
	}}
/>

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
			<TodoCategoryInput bind:category />
		</div>
		<div class="action flex justify-end gap-4">
			<BaseButton text="cancel" type="button" variant="secondary" onClick={closeForm} />
			<BaseButton text="add todos" type="submit" variant="primary" />
		</div>
	</form>
</Overlay>
