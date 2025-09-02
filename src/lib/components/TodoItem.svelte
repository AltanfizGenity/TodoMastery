<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { CircleLine, CircleCheckLine, TrashLine, CloseCircleLine } from './icons/line';
	import { isTodoPropertyOpen, todoPropertyId } from '$lib/store/appstate';
	import type { Todo } from '$lib/database/server/schema/todos-schema';
	import { deleteTodoFromDatabase } from '$lib/api/todos/delete';
	import { makeTodoCompleteToDatabase } from '$lib/api/todos/modify';

	interface TodoItemProps {
		currentTodo: Todo;
	}

	let { currentTodo }: TodoItemProps = $props();

	function editTodo() {
		todoPropertyId.set(currentTodo.id);
		isTodoPropertyOpen.set(true);
	}

	async function deleteTodo() {
		let result = await deleteTodoFromDatabase(currentTodo.id);
		if (!result.success) {
			console.log('delete failed: ', result.errorMessage);
			return;
		}
		todos.update((prev) => prev.filter((todo) => todo.id !== currentTodo.id));
	}

	async function updateTodoCompletion(completed: boolean = true) {
		let result = await makeTodoCompleteToDatabase(currentTodo.id, completed);

		if (!result.success) {
			console.log('complete failed: ', result.errorMessage);
			return;
		}

		let updatedTodo = result.data as Todo;
		todos.update((prev) => prev.map((todo) => (todo.id === currentTodo.id ? updatedTodo : todo)));
	}
</script>

{#snippet action(callback: () => void, Icon: SvelteComponent, className?: string)}
	<button
		class={`cursor-pointer flex items-center justify-center hover:text-amber-500 ${className} w-6 h-6`}
		onclick={(event) => {
			event.stopPropagation();
			callback();
		}}
	>
		<Icon />
	</button>
{/snippet}

{#snippet completeAction()}
	{#if currentTodo.completed}
		{@render action(() => updateTodoCompletion(false), CloseCircleLine)}
	{:else}
		{@render action(() => {}, CircleLine, 'group-hover/complete-action:hidden')}
		{@render action(
			() => updateTodoCompletion(),
			CircleCheckLine,
			'hidden group-hover/complete-action:flex'
		)}
	{/if}
{/snippet}

<div
	role="button"
	tabindex="0"
	class="todo flex justify-between hover:bg-gray-50 p-2 cursor-pointer group w-full text-left"
	aria-label="Edit todo"
	onclick={editTodo}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			editTodo();
		}
	}}
>
	<div class="todo-information flex gap-2 items-center">
		<div class="complete-action group/complete-action hidden group-hover:flex">
			{@render completeAction()}
		</div>
		<h3 class={`${currentTodo.completed ? 'line-through' : ''} group-hover:text-amber-500`}>
			{currentTodo.title}
		</h3>
	</div>
	<div class="todo-actions hidden group-hover:flex gap-2">
		{@render action(deleteTodo, TrashLine)}
	</div>
</div>
