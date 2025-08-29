<script lang="ts">
	import type { Todo } from '$lib/database/server/schema/todos-schema';
	import TodoItem from './TodoItem.svelte';

	interface TodolistProps {
		todos: Todo[];
		emptyMessage?: string;
	}

	let { todos, emptyMessage }: TodolistProps = $props();
</script>

{#if todos.length == 0}
	{#if emptyMessage}
		<h2 class="text-gray-400">{emptyMessage}</h2>
	{/if}
{:else}
	<div class="todo-list flex flex-col">
		{#each todos as todo}
			<TodoItem currentTodo={todo} />
		{/each}
	</div>
{/if}
