<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { tags } from '$lib/store/userdata';
	import { DateTime } from 'luxon';

	let title = $state('');
	let dueDate = $state('');
	let tag = $state<string | null>(null);
	let tagInput = $state('');

	let isCreatingTag = $state(false);

	function handleSubmit() {
		let newTodo: Todo = {
			id: crypto.randomUUID(),
			title: title,
			completed: false,
			dueDate: dueDate || null,
			tag
		};

		todos.update((todos) => [...todos, newTodo]);
	}

	function handleTagInputChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		if (target.value === 'create-new-tags') {
			isCreatingTag = true;
			tag = null;
		}
	}

	function createTag(event: SubmitEvent) {
		event.preventDefault();
		tags.update((currentTags) => {
			let newTags = currentTags.includes(tagInput) ? currentTags : [...currentTags, tagInput];
			tag = tagInput;
			return newTags;
		});
		tagInput = '';
		isCreatingTag = false;
	}
</script>

{#if isCreatingTag}
	<form onsubmit={createTag}>
		<input type="text" placeholder="new tags" bind:value={tagInput} required />
		<button type="submit">create tag</button>
	</form>
{/if}

<form class="todo-form flex gap-4" onsubmit={handleSubmit}>
	<input type="text" placeholder="Add a todo" bind:value={title} required />
	<input type="date" bind:value={dueDate} min={DateTime.now().toISODate()} />
	<select name="tag" id="tag" bind:value={tag} onchange={handleTagInputChange}>
		<option value={null}>no tag</option>
		{#each $tags as tag}
			<option value={tag}>{tag}</option>
		{/each}
		<option value="create-new-tags">+ new tag</option>
	</select>
	<button class="bg-amber-400 w-32 text-black" type="submit">create new todo</button>
</form>
