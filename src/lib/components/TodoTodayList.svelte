<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { getTodayTodos } from '$lib/utils/todos';
	import TodoItem from './TodoItem.svelte';

	let todayTodos = $derived(getTodayTodos($todos));
	let isTodosEmpty = $derived(todayTodos.length == 0);
</script>

{#if isTodosEmpty}
	<h2 class="text-gray-400">No todos today</h2>
{:else}
	<div class="todo-list flex flex-col">
		{#each todayTodos as todo}
			<TodoItem currentTodo={todo} />
		{/each}
	</div>
{/if}
