<script lang="ts">
	import { todos } from '$lib/store/todo';

	let todoTitle = $state('');

	function handleSubmit() {
		let newTodo: Todo = {
			id: crypto.randomUUID(),
			title: todoTitle,
			completed: false
		};

		todos.update((todos) => [...todos, newTodo]);
	}

	function makeTodoComplete(todoId: string) {
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

<div class="todo-container">
	<h1>Todos</h1>
	<div class="todo-list">
		{#each $todos as todo}
			<div class="todo">
				<h3 class={`${todo.completed ? 'line-through' : ''}`}>{todo.title}</h3>
				<button class="cursor-pointer" onclick={() => makeTodoComplete(todo.id)}
					>✅ Mark as complete</button
				>
			</div>
		{/each}
	</div>
	<form class="todo-form" onsubmit={handleSubmit}>
		<input type="text" placeholder="Add a todo" bind:value={todoTitle} />
		<button type="submit">create new todo</button>
	</form>
</div>
