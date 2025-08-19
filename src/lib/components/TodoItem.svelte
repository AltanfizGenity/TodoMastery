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

<div class="todo flex justify-between hover:bg-gray-50 p-2 cursor-pointer group">
	<div class="todo-information">
		<h3 class={`${currentTodo.completed ? 'line-through' : ''} group-hover:text-amber-500`}>
			{currentTodo.title}
		</h3>
	</div>
	<div class="todo-actions hidden group-hover:flex">
		<button
			class="cursor-pointer"
			onclick={() => (currentTodo.completed ? incompleteTodo() : completeTodo())}
		>
			<span aria-hidden="true">{currentTodo.completed ? '❌' : '✅'}</span>
		</button>
		<button class="cursor-pointer" onclick={deleteTodo}>
			<span aria-hidden="true">🗑️</span>
		</button>
	</div>
	<div class="todo-details hidden">
		{#if currentTodo?.dueDate}
			<p class={`${isOverdue ? 'text-red-500' : ''}`}>{dueDateText}</p>
		{/if}
		{#if currentTodo?.tag}
			<p class="text-gray-400">{currentTodo.tag}</p>
		{/if}
	</div>
</div>
