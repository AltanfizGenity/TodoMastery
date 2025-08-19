<script lang="ts">
	import TodoForm from '$lib/components/TodoForm.svelte';
	import TodoList from '$lib/components/TodoList.svelte';
</script>

<div class="todo-container flex flex-col gap-8">
	<h1 class="text-2xl font-bold">Todos</h1>
	<TodoList />
	<TodoForm />
</div>
