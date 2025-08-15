<script lang="ts">
	import { todos } from '$lib/store/todo';

	interface TodoItemProps {
		todo: Todo;
	}

	let { todo }: TodoItemProps = $props();

	function completeTodo(todoId: string) {
		let updatedTodos = $todos.map((todo) => {
			if (todo.id === todoId) {
				return {
					...todo,
					completed: true
				};
			}

			return todo;
		});
		todos.set(updatedTodos);
	}
</script>

<div class="todo">
	<h3 class={`${todo.completed ? 'line-through' : ''}`}>{todo.title}</h3>
	<button class="cursor-pointer" onclick={() => completeTodo(todo.id)}>✅ Mark as complete</button>
</div>
