<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { DateTime } from 'luxon';

	interface TodoItemProps {
		currentTodo: Todo;
	}

	let { currentTodo }: TodoItemProps = $props();

	let dueDateTime = $derived(currentTodo.dueDate ? DateTime.fromISO(currentTodo.dueDate) : null);
	let dueDateText = $derived(dueDateTime ? dueDateTime.toFormat('dd LLLL') : null);
	let isOverdue = $derived(dueDateTime ? dueDateTime < DateTime.now() : false);

	function completeTodo() {
		let updatedTodos = $todos.map((todo) => {
			if (todo.id === currentTodo.id) {
				return {
					...todo,
					completed: true
				};
			}

			return todo;
		});
		todos.set(updatedTodos);
	}

	function incompleteTodo() {
		let updatedTodos = $todos.map((todo) => {
			if (todo.id === currentTodo.id) {
				return {
					...todo,
					completed: false
				};
			}

			return todo;
		});
		todos.set(updatedTodos);
	}

	function deleteTodo() {
		let updatedTodos = $todos.filter((todo) => todo.id !== currentTodo.id);
		todos.set(updatedTodos);
	}
</script>

<div class="todo flex items-center gap-6 hover:bg-gray-100">
	<h3 class={`${currentTodo.completed ? 'line-through' : ''}`}>{currentTodo.title}</h3>
	{#if currentTodo?.dueDate}
		<p class={`${isOverdue ? 'text-red-500' : ''}`}>{dueDateText}</p>
	{/if}

	<button
		class="cursor-pointer"
		onclick={() => (currentTodo.completed ? incompleteTodo() : completeTodo())}
	>
		<span aria-hidden="true">{currentTodo.completed ? '❌' : '✅'}</span>
		{currentTodo.completed ? 'Mark as incomplete' : 'Mark as complete'}</button
	>
	<button class="cursor-pointer" onclick={deleteTodo}>
		<span aria-hidden="true">🗑️</span>
		Delete
	</button>
</div>
