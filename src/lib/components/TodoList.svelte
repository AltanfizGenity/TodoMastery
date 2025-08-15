<script lang="ts">
	import { todos } from '$lib/store/todo';
	import TodoItem from './TodoItem.svelte';

	let isTodosEmpty = $derived($todos.length == 0);
</script>

{#if isTodosEmpty}
	<h2 class="text-gray-400">No todos yet</h2>
{:else}
	<div class="todo-list flex flex-col gap-3">
		{#each $todos as todo}
			<TodoItem currentTodo={todo} />
		{/each}
	</div>
{/if}
