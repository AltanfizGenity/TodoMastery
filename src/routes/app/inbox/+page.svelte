<script lang="ts">
	import TodoListView from '$lib/components/todo/TodolistView.svelte';
	import QuickAddButton from '$lib/components/buttons/AddButton.svelte';
	import QuickForm from '$lib/components/forms/QuickForm.svelte';
	import CompletedTodoListView from '$lib/components/todo/CompletedTodoListView.svelte';
	import { quickFormState, uncompletedTodos } from '$lib/stores/app.store';
	import { openDefaultQuickForm } from '$lib/utils/app.utils';
</script>

<div class="todo-mastery">
	<main class="list-main-view">
		<h1>Inbox</h1>
		<TodoListView todos={$uncompletedTodos} />
		{#if $quickFormState.isOpen && !$quickFormState.editMode}
			<QuickForm />
		{:else}
			<QuickAddButton
				onclick={() => {
					openDefaultQuickForm();
				}}
			/>
		{/if}
		<CompletedTodoListView />
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
