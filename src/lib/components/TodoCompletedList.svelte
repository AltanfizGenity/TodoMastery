<script lang="ts">
	import { todos } from '$lib/store/todo';
	import TodoItem from './TodoItem.svelte';

	let completedTodos = $derived($todos.filter((todo) => todo.completed));
	let isTodosEmpty = $derived(completedTodos.length == 0);
</script>

{#if isTodosEmpty}
	<h2 class="text-gray-400">You haven't completed any todo yet</h2>
{:else}
	<div class="todo-list flex flex-col">
		{#each completedTodos as todo}
			<TodoItem currentTodo={todo} />
		{/each}
	</div>
{/if}
