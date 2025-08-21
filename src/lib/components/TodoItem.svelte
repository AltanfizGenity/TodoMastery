<script lang="ts">
	import { completeTodo, deleteTodo, incompleteTodo } from '$lib/store/todo';
	import { DateTime } from 'luxon';
	import { CircleLine, CircleCheckLine, TrashLine, CloseCircleLine } from './icons/line';

	interface TodoItemProps {
		currentTodo: Todo;
	}

	let { currentTodo }: TodoItemProps = $props();
	let dueDateTime = $derived(currentTodo.dueDate ? DateTime.fromISO(currentTodo.dueDate) : null);
	let dueDateText = $derived(dueDateTime ? dueDateTime.toFormat('dd LLLL') : null);
	let isOverdue = $derived(dueDateTime ? dueDateTime < DateTime.now() : false);
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
		{@render action(
			() => incompleteTodo(currentTodo.id),
			CircleCheckLine,
			'group-hover/complete-action:hidden'
		)}
		{@render action(
			() => incompleteTodo(currentTodo.id),
			CloseCircleLine,
			'hidden group-hover/complete-action:flex'
		)}
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

<div class="todo flex justify-between hover:bg-gray-50 p-2 cursor-pointer group">
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
