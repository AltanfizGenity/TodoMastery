<script lang="ts">
	import { todos } from '$lib/store/todo';
	import Overlay from './Overlay.svelte';
	import { isCreatingCategory, isTodoFormOpen } from '$lib/store/appstate';

	import BaseButton from './buttons/BaseButton.svelte';
	import TodoTitleInput from './forms/TodoTitleInput.svelte';
	import type { NewTodo } from '$lib/database/server/schema/todos-schema';
	import { createTodoDB } from '$lib/api/db/todos/create';
	import { categories } from '$lib/store/userdata';
	import { trapFocus } from '$lib/utils/svelte/action.svelte';
	import { validateTodoTitle } from '$lib/utils/validation';
	import { page } from '$app/state';
	import { DateTime } from 'luxon';
	import type { User } from '$lib/database/server/schema/users';
	import DeadlineInput from './forms/DeadlineInput.svelte';
	import CategoryInput from './forms/CategoryInput.svelte';

	let user = page.data.user as User;

	let title = $state('');
	let dueDate = $state<string | null>('');
	let categoryId = $state<number | null>(null);

	// TODO: Delete this code because the category form was moved to parent
	$effect(() => {
		if (!$isCreatingCategory) {
			categoryId = null;
		}

		if ($isTodoFormOpen) {
			let pageTitle = (page.data.pageTitle as string) || null;
			if (pageTitle && pageTitle === 'today') {
				dueDate = DateTime.now().toISODate();
			}
		}
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		let validatedTitle = validateTodoTitle(title);
		if (!validatedTitle) {
			alert('cannot create todo with empty title');
			return;
		}

		let category = $categories.find((category) => category.id === categoryId);
		let newTodo: NewTodo = {
			user_id: user.id,
			title: validatedTitle,
			dueDate: dueDate,
			category_id: category?.id || null
		};

		let result = await createTodoDB(newTodo);
		if (!result.success) {
			alert('There something error on server');
		} else {
			let newTodos = result.data!;
			todos.update((currentTodos) => [...currentTodos, ...newTodos]);
		}

		closeForm();
	}

	function closeForm() {
		isTodoFormOpen.set(false);
		resetForm();
	}

	function resetForm() {
		title = '';
		dueDate = '';
		categoryId = null;
	}
</script>

<Overlay isOpen={$isTodoFormOpen} onClosed={() => {}}>
	<form
		class="todo-form gap-4 p-4 bg-gray-50 flex flex-col w-1/2 rounded-xl absolute top-1/4"
		onsubmit={handleSubmit}
		use:trapFocus
	>
		<div class="input-group">
			<TodoTitleInput onTitleChange={(newTitle) => (title = newTitle)} {title} />
		</div>
		<div class="input-group flex gap-2">
			<DeadlineInput ondatechange={(newDate) => (dueDate = newDate?.toISO()!)} />
			<CategoryInput onvaluechange={(newCategory) => (categoryId = newCategory?.id || null)} />
		</div>
		<div class="action flex justify-end gap-4">
			<BaseButton text="cancel" type="button" variant="secondary" onClick={closeForm} />
			<BaseButton text="add todos" type="submit" variant="primary" />
		</div>
	</form>
</Overlay>
