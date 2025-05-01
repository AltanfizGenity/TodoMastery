<script lang="ts">
	import { isShowCompleteTodo, todoList } from '$lib/stores/app.store';
	import ShowCompletedTodoButton from '$lib/components/buttons/ShowCompletedTodoButton.svelte';
	import TodoElement from './TodoElement.svelte';

	let completeTodos = $derived<Todo[]>(
		$todoList.filter((everyTodo) => everyTodo.isComplete == true)
	);
</script>

<div class="completed-list-view">
	<ShowCompletedTodoButton todoAmount={completeTodos.length} />
	{#if $isShowCompleteTodo}
		{#if completeTodos.length > 0}
			<div class="list-view">
				{#each completeTodos as todo}
					<TodoElement {todo} />
				{/each}
			</div>
		{:else}
			<p class="text complete-empty-text">No task completed yet!</p>
		{/if}
	{/if}
</div>

<style>
	.completed-list-view {
		width: var(--full);
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: var(--spacing-4);
	}

	.list-view {
		width: var(--full);
	}

	.complete-empty-text {
		color: #aaa;
		padding-inline: 0.5rem;
	}
</style>
