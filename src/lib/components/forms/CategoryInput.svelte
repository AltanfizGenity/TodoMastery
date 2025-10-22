<script lang="ts">
	import { CategoryLine } from '../icons/line';
	import { onMount } from 'svelte';
	import CategoryPicker from './CategoryPicker.svelte';
	import type { Category } from '$lib/database/server/schema/categories-schema';

	interface InputProps {
		onvaluechange: (newCategory: Category | null) => void;
		initialValue?: Category | null;
	}

	let { onvaluechange, initialValue }: InputProps = $props();

	let isPickerOpen = $state(false);
	let categoryInput = $state<Category | null>(null);
	let label = $derived.by(() => {
		if (!categoryInput) {
			return 'No category';
		}

		return categoryInput.name;
	});

	onMount(() => {
		if (initialValue !== undefined) {
			categoryInput = initialValue;
		}
	});

	function handleclick() {
		isPickerOpen = true;
	}

	function closepicker() {
		isPickerOpen = false;
	}

	function handleNewCategory(newCategory: Category | null) {
		categoryInput = newCategory;
		onvaluechange(newCategory);
		closepicker();
	}
</script>

<div class="category-input">
	<button
		type="button"
		class="flex items-center gap-2 px-2 py-1 rounded-xl outline-gray-400 outline-1 cursor-pointer text-gray-600 hover:outline-gray-600 hover:text-gray-800"
		onclick={handleclick}
	>
		<div class="icon w-4">
			<CategoryLine />
		</div>
		<p class="capitalize">{label}</p>
	</button>
	<CategoryPicker oncancel={closepicker} onconfirm={handleNewCategory} isOpen={isPickerOpen} />
</div>
