<script lang="ts">
	import TodoList from '$lib/components/TodoList.svelte';
	import TodoProperty from '$lib/components/TodoProperty.svelte';

	let { data } = $props();
</script>

<div class="todo-container flex flex-col gap-8">
	<h1 class="text-2xl font-bold">Todos</h1>
	<TodoList todos={data.todos} />
	<TodoProperty />
</div>
