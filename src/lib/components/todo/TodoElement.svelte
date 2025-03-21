<script lang="ts">
	import { todoList, quickFormState } from '$lib/stores/app.store';
	import QuickForm from '$lib/components/forms/QuickForm.svelte';
	import CompleteTodoButton from '$lib/components/buttons/CompleteTodoButton.svelte';
	import DeleteTodoButton from '$lib/components/buttons/DeleteTodoButton.svelte';
	import EditTodoButton from '$lib/components/buttons/EditTodoButton.svelte';
	import RevertTodoButton from '$lib/components/buttons/RevertTodoButton.svelte';

	let { todo }: TodoProps = $props();

	function deleteTodo() {
		$todoList = $todoList.filter((everyTodo) => everyTodo.id != todo.id);
	}

	function editTodo() {
		quickFormState.set({ editMode: true, isOpen: true, todoID: todo.id });
	}

	function completeTodo() {
		$todoList = $todoList.map((everyTodo) => {
			if (everyTodo.id == todo.id) {
				return { ...everyTodo, isComplete: true };
			}
			return everyTodo;
		});
	}

	function revertTodo() {
		$todoList = $todoList.map((everyTodo) => {
			if (everyTodo.id == todo.id) {
				return { ...everyTodo, isComplete: false };
			}
			return everyTodo;
		});
	}
</script>

{#if $quickFormState.isOpen && $quickFormState.todoID == todo.id}
	<QuickForm />
{:else}
	<div class={`todo ${todo.isComplete ? 'completed' : ''}`}>
		<div class="title font-light">{todo.title}</div>
		<div class="actions">
			{#if todo.isComplete}
				<RevertTodoButton onclick={revertTodo} />
			{:else}
				<CompleteTodoButton onclick={completeTodo} />
			{/if}
			<DeleteTodoButton onclick={deleteTodo} />
			<EditTodoButton onclick={editTodo} />
		</div>
	</div>
{/if}

<style>
	.todo {
		width: var(--full);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: var(--padding-4);
		cursor: pointer;
	}

	.todo.completed {
		.title {
			color: var(--color-muted);
			text-decoration: line-through;
		}
	}

	.actions {
		display: none;
		gap: var(--spacing-4);
		align-items: center;
	}

	.todo:hover .actions {
		display: flex;
	}

	.todo :global(button) {
		width: var(--text-xl);
		height: var(--text-xl);
		padding: 0;
		color: var(--color-muted);
	}

	.todo :global(button:hover) {
		color: var(--color-primary);
	}

	.title {
		font-size: var(--text-base);
	}

	.todo:hover .title {
		color: var(--color-secondary);
	}
</style>
