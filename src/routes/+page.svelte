<script lang="ts">
	import TodoForm from '$lib/components/TodoForm.svelte';
	import TodoList from '$lib/components/TodoList.svelte';
</script>

<div class="todo-container">
	<h1>Todos</h1>
	<TodoList />
	<TodoForm />
</div>
