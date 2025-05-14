<script lang="ts">
	import { todoList } from '$lib/stores/app.store';
	import TodoElement from './TodoElement.svelte';

	interface TodolistViewProps extends ElementProps {
		todos: Todo[];
	}

	const { todos }: TodolistViewProps = $props();
</script>

<div class="todo-list-view">
	{#each todos as todo}
		<TodoElement {todo} />
	{/each}
</div>

<style>
	.todo-list-view {
		width: var(--full);
		display: flex;
		flex-direction: column;
	}
</style>
