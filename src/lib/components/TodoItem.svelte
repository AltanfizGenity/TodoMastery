<script lang="ts">
	import { completeTodo, deleteTodo } from '$lib/store/todo';
	import { CircleCheck, Trash, type IconProps } from '@lucide/svelte';
	import { DateTime } from 'luxon';
	import type { Component } from 'svelte';

	interface TodoItemProps {
		currentTodo: Todo;
	}

	let { currentTodo }: TodoItemProps = $props();
	let iconSize = 20;

	let dueDateTime = $derived(currentTodo.dueDate ? DateTime.fromISO(currentTodo.dueDate) : null);
	let dueDateText = $derived(dueDateTime ? dueDateTime.toFormat('dd LLLL') : null);
	let isOverdue = $derived(dueDateTime ? dueDateTime < DateTime.now() : false);
</script>

{#snippet action(callback: () => void, Icon: Component<IconProps>)}
	<button
		class="cursor-pointer flex items-center justify-center hover:text-amber-500"
		onclick={callback}
	>
		<Icon size={iconSize} />
	</button>
{/snippet}

<div class="todo flex justify-between hover:bg-gray-50 p-2 cursor-pointer group">
	<div class="todo-information">
		<h3 class={`${currentTodo.completed ? 'line-through' : ''} group-hover:text-amber-500`}>
			{currentTodo.title}
		</h3>
	</div>
	<div class="todo-actions hidden group-hover:flex gap-2">
		{@render action(() => completeTodo(currentTodo.id), CircleCheck)}
		{@render action(() => deleteTodo(currentTodo.id), Trash)}
	</div>
</div>
