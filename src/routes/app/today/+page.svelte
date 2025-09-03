<script lang="ts">
	import TodoList from '$lib/components/TodoList.svelte';
	import { todos } from '$lib/store/todo.js';
	import { getTodayTodos } from '$lib/utils/todos.js';
	import { onMount } from 'svelte';

	let { data } = $props();
	let todayTodos = $derived(getTodayTodos($todos));

	onMount(() => {
		todos.set(data.todos);
	});
</script>

<div class="todo-container flex flex-col gap-8">
	<h1 class="text-2xl font-bold">Today</h1>
	<TodoList todos={todayTodos} emptyMessage="There nothing to do" />
</div>
