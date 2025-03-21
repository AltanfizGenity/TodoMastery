<script lang="ts">
	import { todoList } from '$lib/stores/app.store';
	import TodoElement from './TodoElement.svelte';
</script>

<div class="todo-list-view">
	{#each $todoList.filter((todo) => !todo.isComplete) as todo}
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
