<script lang="ts">
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

	function changeTodoTitle(newTitle: string) {
		console.log(newTitle);
	}

	function changeDueDate(newDate: string) {
		console.log(newDate);
	}

	function changeCategory(newCategory: string) {
		console.log(newCategory);
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
