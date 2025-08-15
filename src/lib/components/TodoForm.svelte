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
</script>

<form class="todo-form" onsubmit={handleSubmit}>
	<input type="text" placeholder="Add a todo" bind:value={todoTitle} />
	<button type="submit">create new todo</button>
</form>
