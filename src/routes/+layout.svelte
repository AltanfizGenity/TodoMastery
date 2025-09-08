<script lang="ts">
	import { onMount } from 'svelte';
	import './app.css';
	// import { todos } from '$lib/store/todo';
	// import { fetchCategories, saveTodos } from '$lib/database/todo';
	let { children } = $props();

	onMount(() => {
		// It fetct all required data from database
		// categories.set(fetchCategories());
	});

	// $effect(() => {
	// 	saveTodos($todos);
	// });
</script>

<div class="app">
	{@render children()}
</div>
