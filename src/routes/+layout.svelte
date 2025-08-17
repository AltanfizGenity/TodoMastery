<script lang="ts">
	import { onMount } from 'svelte';
	import './app.css';
	import { todos } from '$lib/store/todo';
	import { fetchTags, fetchTodos, saveTags, saveTodos } from '$lib/database/todo';
	import { tags } from '$lib/store/userdata';
	let { children } = $props();

	onMount(() => {
		todos.set(fetchTodos());
		tags.set(fetchTags());
	});

	$effect(() => {
		saveTodos($todos);
		saveTags($tags);
	});
</script>

<div class="app">
	{@render children()}
</div>
