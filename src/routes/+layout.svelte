<script lang="ts">
	import { onMount } from 'svelte';
	import './app.css';
	import { todos } from '$lib/store/todo';
	import { fetchCategories, saveCateogies, saveTodos } from '$lib/database/todo';
	import { categories } from '$lib/store/userdata';
	let { children } = $props();

	onMount(() => {
		categories.set(fetchCategories());
	});

	$effect(() => {
		saveTodos($todos);
		saveCateogies($categories);
	});
</script>

<div class="app">
	{@render children()}
</div>
