<script lang="ts">
	import { todos } from '$lib/store/todo';
	import TodoItem from './TodoItem.svelte';
</script>

<div class="todo-list">
	{#each $todos as todo}
		<TodoItem currentTodo={todo} />
	{/each}
</div>
