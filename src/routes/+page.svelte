<script lang="ts">
	import TodoListView from '$lib/components/todo/TodoListView.svelte';
	import QuickAddButton from '$lib/components/buttons/QuickAddButton.svelte';
	import QuickForm from '$lib/components/forms/QuickForm.svelte';
	import CompletedTodoListView from '$lib/components/todo/CompletedTodoListView.svelte';
	import { quickFormState } from '$lib/stores/app.store';
	import Datepicker from '$lib/components/forms/Datepicker.svelte';
</script>

<div class="todo-mastery">
	<main class="list-main-view">
		<!-- <TodoListView />
		{#if $quickFormState.isOpen && !$quickFormState.editMode}
			<QuickForm />
		{:else}
			<QuickAddButton />
		{/if}
		<CompletedTodoListView /> -->
		<Datepicker />
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
		gap: var(--spacing-8);
	}
</style>
