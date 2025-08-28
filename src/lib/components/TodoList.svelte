<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { getUncompletedTodos } from '$lib/utils/todos';
	import TodoItem from './TodoItem.svelte';

	let activeTodos = $derived(getUncompletedTodos($todos));
	let isTodosEmpty = $derived(activeTodos.length == 0);
</script>

{#if isTodosEmpty}
	<h2 class="text-gray-400">No todos yet</h2>
{:else}
	<div class="todo-list flex flex-col">
		{#each activeTodos as todo}
			<TodoItem currentTodo={todo} />
		{/each}
	</div>
{/if}
