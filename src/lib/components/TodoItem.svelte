<script lang="ts">
	import { todos } from '$lib/store/todo';

	interface TodoItemProps {
		currentTodo: Todo;
	}

	let { currentTodo }: TodoItemProps = $props();

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
