<script lang="ts">
	import TodoList from '$lib/components/TodoList.svelte';
	import TodoProperty from '$lib/components/TodoProperty.svelte';
	import { todos } from '$lib/store/todo.js';
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		todos.set(data.todos);
	});
</script>

<div class="todo-container flex flex-col gap-8">
	<h1 class="text-2xl font-bold">Todos</h1>
	<TodoList todos={$todos} />
	<TodoProperty />
</div>
