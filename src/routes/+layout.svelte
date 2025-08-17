<script lang="ts">
	import { onMount } from 'svelte';
	import './app.css';
	import { todos } from '$lib/store/todo';
	import { fetchTodos, saveTodos } from '$lib/database/todo';
	let { children } = $props();

	onMount(() => {
		todos.set(fetchTodos());
	});

	$effect(() => {
		saveTodos($todos);
	});
</script>

<div class="app">
	{@render children()}
</div>
