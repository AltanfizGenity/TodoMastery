<script lang="ts">
	import TodoForm from '$lib/components/TodoForm.svelte';
	import TodoItem from '$lib/components/TodoItem.svelte';
	import { todos } from '$lib/store/todo';
</script>

<div class="todo-container">
	<h1>Todos</h1>
	<div class="todo-list">
		{#each $todos as todo}
			<TodoItem currentTodo={todo} />
		{/each}
	</div>
	<TodoForm />
</div>
