<script lang="ts">
	import TodoList from '$lib/components/TodoList.svelte';
	import { todos } from '$lib/store/todo.js';
	import { getCompletedTodos } from '$lib/utils/todos.js';
	import { onMount } from 'svelte';

	let { data } = $props();
	let completedTodos = $derived(getCompletedTodos($todos));

	onMount(() => {
		todos.set(data.todos);
	});
</script>

<div class="todo-container flex flex-col gap-8">
	<h1 class="text-2xl font-bold">Completed Todos</h1>
	<TodoList todos={completedTodos} emptyMessage="You haven't completed any todo yet" />
</div>
