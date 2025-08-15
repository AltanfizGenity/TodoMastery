<script lang="ts">
	import { todos } from '$lib/store/todo';

	interface TodoItemProps {
		todo: Todo;
	}

	let { todo }: TodoItemProps = $props();

	function completeTodo() {
		let updatedTodos = $todos.map((todo) => {
			if (todo.id === todo.id) {
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
			if (todo.id === todo.id) {
				return {
					...todo,
					completed: false
				};
			}

			return todo;
		});
		todos.set(updatedTodos);
	}
</script>

<div class="todo">
	<h3 class={`${todo.completed ? 'line-through' : ''}`}>{todo.title}</h3>
	{#if todo.completed}
		<button class="cursor-pointer" onclick={incompleteTodo}>❌ Mark as incomplete</button>
	{:else}
		<button class="cursor-pointer" onclick={completeTodo}>✅ Mark as complete</button>
	{/if}
</div>
