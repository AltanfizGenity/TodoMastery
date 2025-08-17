<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { DateTime } from 'luxon';

	let title = $state('');
	let dueDate = $state('');
	let label = $state<string | null>(null);

	function handleSubmit() {
		let newTodo: Todo = {
			id: crypto.randomUUID(),
			title: title,
			completed: false,
			dueDate: dueDate || null,
			label: label
		};

		todos.update((todos) => [...todos, newTodo]);
	}
</script>

<form class="todo-form flex gap-4" onsubmit={handleSubmit}>
	<input type="text" placeholder="Add a todo" bind:value={title} required />
	<input type="date" bind:value={dueDate} min={DateTime.now().toISODate()} />
	<select name="label" id="label" bind:value={label}>
		<option value={null}>no label</option>
		<option value="work">work</option>
		<option value="personal">personal</option>
	</select>
	<button class="bg-amber-400 w-32 text-black" type="submit">create new todo</button>
</form>
