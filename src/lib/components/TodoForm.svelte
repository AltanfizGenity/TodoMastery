<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { DateTime } from 'luxon';

	let title = $state('');
	let dueDate = $state('');

	function handleSubmit() {
		let newTodo: Todo = {
			id: crypto.randomUUID(),
			title: title,
			completed: false,
			dueDate: dueDate || null
		};

		todos.update((todos) => [...todos, newTodo]);
	}
</script>

<form class="todo-form flex gap-4" onsubmit={handleSubmit}>
	<input type="text" placeholder="Add a todo" bind:value={title} required />
	<input type="date" bind:value={dueDate} min={DateTime.now().toISODate()} />
	<button class="bg-amber-400 w-32 text-black" type="submit">create new todo</button>
</form>
