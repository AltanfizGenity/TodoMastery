<script lang="ts">
	import TodoListView from '$lib/components/todo/TodolistView.svelte';
	import { currentAppPage, todoList } from '$lib/stores/app.store';
	import { onMount } from 'svelte';

	let completedTodos = $derived.by(() => $todoList.filter((todo) => todo.isComplete));

	onMount(() => {
		currentAppPage.set('completed');
	});
</script>

<div class="todo-mastery">
	<main class="list-main-view">
		<h1>Completed</h1>
		<TodoListView todos={completedTodos} />
	</main>
</div>

<style>
	.todo-mastery {
		width: var(--full);
		height: var(--full);
		min-height: 100dvh;
		padding: var(--padding-20);
	}

	.list-main-view {
		width: 80%;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: var(--spacing-4);
	}
</style>
