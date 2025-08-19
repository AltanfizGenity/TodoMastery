<script lang="ts">
	import { todos } from '$lib/store/todo';
	import { tags } from '$lib/store/userdata';
	import { DateTime } from 'luxon';
	import Overlay from './Overlay.svelte';

	let title = $state('');
	let dueDate = $state('');
	let tag = $state<string | null>(null);
	let tagInput = $state('');
	let isCreatingTag = $state(false);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

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
		tagInput = tagInput.trim();
		if (!tagInput) return;
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

<Overlay isActive={true} onClosed={() => {}}>
	<form
		class="todo-form gap-4 p-4 bg-gray-50 flex flex-col w-1/2 rounded-xl"
		onsubmit={handleSubmit}
	>
		<div class="input-group">
			<input
				type="text"
				placeholder="your todo title"
				bind:value={title}
				required
				class="outline-0"
			/>
		</div>
		<div class="input-group">
			<input type="date" bind:value={dueDate} min={DateTime.now().toISODate()} />
			<select name="tag" id="tag" bind:value={tag} onchange={handleTagInputChange}>
				<option value={null}>no tag</option>
				{#each $tags as tag}
					<option value={tag}>{tag}</option>
				{/each}
				<option value="create-new-tags">+ new tag</option>
			</select>
		</div>
		<div class="action flex justify-end gap-4">
			<button class="bg-gray-100 text-black capitalize py-1 px-4 cursor-pointer" type="submit"
				>cancel</button
			>
			<button class="bg-amber-400 text-black capitalize py-1 px-4 cursor-pointer" type="submit"
				>add todo</button
			>
		</div>
	</form>
</Overlay>
