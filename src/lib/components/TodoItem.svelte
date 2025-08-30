<script lang="ts">
	import { completeTodo, deleteTodo, incompleteTodo } from '$lib/store/todo';
	import { CircleLine, CircleCheckLine, TrashLine, CloseCircleLine } from './icons/line';
	import { isTodoPropertyOpen, todoPropertyId } from '$lib/store/appstate';
	import type { Todo } from '$lib/database/server/schema/todos-schema';

	interface TodoItemProps {
		currentTodo: Todo;
	}

	let { currentTodo }: TodoItemProps = $props();

	function editTodo() {
		todoPropertyId.set(currentTodo.id);
		isTodoPropertyOpen.set(true);
	}
</script>

{#snippet action(callback: () => void, Icon: SvelteComponent, className?: string)}
	<button
		class={`cursor-pointer flex items-center justify-center hover:text-amber-500 ${className} w-6 h-6`}
		onclick={callback}
	>
		<Icon />
	</button>
{/snippet}

{#snippet completeAction()}
	{#if currentTodo.completed}
		{@render action(() => incompleteTodo(currentTodo.id), CloseCircleLine)}
	{:else}
		{@render action(
			() => completeTodo(currentTodo.id),
			CircleLine,
			'group-hover/complete-action:hidden'
		)}
		{@render action(
			() => completeTodo(currentTodo.id),
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
		{@render action(() => deleteTodo(currentTodo.id), TrashLine)}
	</div>
</div>
