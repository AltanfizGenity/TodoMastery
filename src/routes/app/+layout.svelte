<script lang="ts">
	import AsideNavigation from '$lib/components/AsideNavigation.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import TodoForm from '$lib/components/TodoForm.svelte';
	import TodoProperty from '$lib/components/TodoProperty.svelte';
	import { isCreatingCategory } from '$lib/store/appstate.js';
	import { categories } from '$lib/store/userdata';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	onMount(() => {
		categories.set(data.categories);
	});
</script>

<div class="app-container flex min-h-screen h-screen">
	<AsideNavigation />
	<main class="px-16 py-8 flex-1">
		{@render children()}
	</main>
	<TodoForm />
	<TodoProperty />
	<CategoryForm
		isOpen={$isCreatingCategory}
		onClose={() => {
			isCreatingCategory.set(false);
		}}
	/>
</div>
