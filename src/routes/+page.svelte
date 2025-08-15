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

<div class="todo-container">
	<h1>Todos</h1>
	<div class="todo-list">
		{#each $todos as todo}
			<h3>{todo.title}</h3>
		{/each}
	</div>
	<form class="todo-form" onsubmit={handleSubmit}>
		<input type="text" placeholder="Add a todo" bind:value={todoTitle} />
		<button type="submit">create new todo</button>
	</form>
</div>
