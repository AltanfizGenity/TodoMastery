<script lang="ts">
	import { updateTodoDB } from '$lib/api/db/todos/modify';
	import type { Todo } from '$lib/database/server/schema/todos-schema';
	import { isTodoPropertyOpen, todoPropertyId } from '$lib/store/appstate';
	import { todos } from '$lib/store/todo';
	import TodoCategoryInput from './forms/TodoCategoryInput.svelte';
	import TodoDeadlineInput from './forms/TodoDeadlineInput.svelte';
	import TodoTitleInput from './forms/TodoTitleInput.svelte';
	import { CloseLine } from './icons/line';
	import Overlay from './Overlay.svelte';

	let selectedTodo = $state<Todo>();

	$effect(() => {
		selectedTodo = $todos.find((todo) => todo.id == $todoPropertyId);
	});

	function closeModal() {
		isTodoPropertyOpen.set(false);
		todoPropertyId.set(null);
	}

	function shouldUpdate<K extends keyof Todo>(original: Todo, key: K, newValue: Todo[K]) {
		return original[key] !== newValue;
	}

	const changeTodoTitle = async (newTitle: string) => {
		await updateTodoProperty('title', newTitle);
	};

	const changeDueDate = async (newDate: string) => {
		await updateTodoProperty('dueDate', newDate);
	};

	const changeCategory = async (newCategoryId: number) => {
		await updateTodoProperty('category_id', newCategoryId);
	};

	async function updateTodoProperty<K extends keyof Todo>(key: K, value: Todo[K]) {
		if (!selectedTodo) {
			return;
		}

		let updatedField = { [key]: value };

		if (!shouldUpdate(selectedTodo, key, value)) {
			return;
		}

		let response = await updateTodoDB(selectedTodo.id, updatedField);
		let updatedTodo = response.data as Todo;
		todos.update((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
	}
</script>

{#if selectedTodo}
	<Overlay isOpen={$isTodoPropertyOpen} onClosed={() => {}}>
		<div class="todo-property-container bg-white p-6 max-w-4/5 w-128 rounded-xl">
			<header class="flex justify-end">
				<button onclick={closeModal} class="w-6 cursor-pointer hover:text-amber-500">
					<CloseLine />
				</button>
			</header>
			<br />
			<div class="properties flex flex-col gap-4">
				<div class="title">
					<TodoTitleInput
						title={selectedTodo.title}
						onTitleChange={changeTodoTitle}
						preventEmpty={true}
					/>
				</div>
				<ul class="property-list">
					<TodoDeadlineInput bind:dueDate={selectedTodo.dueDate} onInputChange={changeDueDate} />
					<TodoCategoryInput categoryId={selectedTodo.category_id} onInputChange={changeCategory} />
				</ul>
			</div>
		</div>
	</Overlay>
{/if}
