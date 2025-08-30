<script lang="ts">
	import type { Todo } from '$lib/database/server/schema/todos-schema';
	import { isTodoPropertyOpen, todoPropertyId } from '$lib/store/appstate';
	import { todos } from '$lib/store/todo';
	import TodoTitleInput from './forms/TodoTitleInput.svelte';
	import Overlay from './Overlay.svelte';

	let todo = $derived<Todo | undefined>($todos.find((todo) => todo.id == $todoPropertyId));

	function closeModal() {
		isTodoPropertyOpen.set(false);
		todoPropertyId.set(null);
	}

	function changeTodoTitle(newTitle: string) {
		if (!newTitle) {
			return;
		}
		todos.update((prev) =>
			prev.map((todo) => (todo.id === $todoPropertyId ? { ...todo, title: newTitle } : todo))
		);
	}
</script>

{#if todo}
	<Overlay isOpen={$isTodoPropertyOpen} onClosed={() => {}}>
		<div class="todo-property-container bg-white p-6 max-w-4/5 w-128 rounded-xl">
			<header class="flex justify-end">
				<button onclick={closeModal}>❌</button>
			</header>
			<br />
			<div class="properties">
				<div class="title">
					<TodoTitleInput
						title={todo.title}
						onTitleChange={(newTitle) => changeTodoTitle(newTitle)}
						preventEmpty={true}
					/>
				</div>
				<div class="property"></div>
			</div>
		</div>
	</Overlay>
{/if}
