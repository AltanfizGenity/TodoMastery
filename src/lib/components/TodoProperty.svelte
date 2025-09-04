<script lang="ts">
	import { updateTodoDB } from '$lib/api/db/todos/modify';
	import type { Todo } from '$lib/database/server/schema/todos-schema';
	import { isTodoPropertyOpen, todoPropertyId } from '$lib/store/appstate';
	import { todos } from '$lib/store/todo';
	import TodoCategoryInput from './forms/TodoCategoryInput.svelte';
	import TodoDeadlineInput from './forms/TodoDeadlineInput.svelte';
	import TodoTitleInput from './forms/TodoTitleInput.svelte';
	import Overlay from './Overlay.svelte';

	let selectedTodo = $state<Todo>();

	$effect(() => {
		selectedTodo = $todos.find((todo) => todo.id == $todoPropertyId);
	});

	function closeModal() {
		isTodoPropertyOpen.set(false);
		todoPropertyId.set(null);
	}

	function shouldUpdate(original: Todo, updated: Todo) {
		return JSON.stringify(original) !== JSON.stringify(updated);
	}

	async function changeTodoTitle(newTitle: string) {
		let tempUpdatedTodo: Todo = { ...selectedTodo!, title: newTitle };

		if (shouldUpdate(selectedTodo!, tempUpdatedTodo)) {
			await updateTodoProperty('title', newTitle);
		}
	}

	async function changeDueDate(newDate: string) {
		let tempUpdatedTodo: Todo = { ...selectedTodo!, dueDate: newDate };
		if (shouldUpdate(selectedTodo!, tempUpdatedTodo)) {
			await updateTodoProperty('dueDate', newDate);
		}
	}

	async function changeCategory(newCategory: string) {
		let tempUpdatedTodo: Todo = { ...selectedTodo!, category: newCategory };
		if (shouldUpdate(selectedTodo!, tempUpdatedTodo)) {
			await updateTodoProperty('category', newCategory);
		}
	}

	async function updateTodoProperty<K extends keyof Todo>(key: K, value: Todo[K]) {
		let updatedField = { [key]: value };

		if (!selectedTodo) {
			return;
		}

		let response = await updateTodoDB(selectedTodo.id, updatedField);
		console.log(true);
		let updatedTodo = response.data as Todo;
		todos.update((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
	}
</script>

{#if selectedTodo}
	<Overlay isOpen={$isTodoPropertyOpen} onClosed={() => {}}>
		<div class="todo-property-container bg-white p-6 max-w-4/5 w-128 rounded-xl">
			<header class="flex justify-end">
				<button onclick={closeModal}>❌</button>
			</header>
			<br />
			<div class="properties">
				<div class="title">
					<TodoTitleInput
						title={selectedTodo.title}
						onTitleChange={changeTodoTitle}
						preventEmpty={true}
					/>
				</div>
				<ul class="property-list">
					<TodoDeadlineInput bind:dueDate={selectedTodo.dueDate} onInputChange={changeDueDate} />
					<TodoCategoryInput bind:category={selectedTodo.category} onInputChange={changeCategory} />
				</ul>
			</div>
		</div>
	</Overlay>
{/if}
