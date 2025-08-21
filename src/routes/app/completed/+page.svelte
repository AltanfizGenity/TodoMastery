<script lang="ts">
	import TodoCompletedList from '$lib/components/TodoCompletedList.svelte';
</script>

<div class="todo-container flex flex-col gap-8">
	<h1 class="text-2xl font-bold">Completed Todos</h1>
	<TodoCompletedList />
</div>
