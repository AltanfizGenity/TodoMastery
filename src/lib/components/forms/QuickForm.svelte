<script lang="ts">
	import { quickFormState, todoList } from '$lib/stores/app.store';
	import Datepicker from './Datepicker.svelte';
	import { formatTime } from '$lib/utils/date';

	let isTimelineInputOpen = $state<boolean>(false);
	let dateValue = $state<LuxonTime | null>(null);

	let currentTodo: Todo = $quickFormState.editMode
		? ($todoList.find((todo) => todo.id == $quickFormState.todoID) as Todo)
		: { id: '', title: '', isComplete: false };

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		let formData: FormData = new FormData(event.target as HTMLFormElement);

		if ($quickFormState.editMode) {
			editTodo(formData);
			return;
		}

		addTodo(formData);
	}

	function editTodo(formData: FormData) {
		let editTodo: Todo = {
			...currentTodo,
			title: formData.get('title') as string
		};

		$todoList = $todoList.map((everyTodo) =>
			everyTodo.id == currentTodo.id ? editTodo : everyTodo
		);

		closeForm();
	}

	function addTodo(formData: FormData) {
		let newTodo: Todo = {
			title: formData.get('title') as string,
			id: crypto.randomUUID(),
			isComplete: false
		};

		$todoList = [...$todoList, newTodo];
	}

	function closeForm() {
		if ($quickFormState.editMode) {
			$quickFormState = {
				...$quickFormState,
				isOpen: false,
				editMode: false,
				todoID: ''
			};
			return;
		}

		$quickFormState.isOpen = false;
	}
</script>

<form onsubmit={handleSubmit} class="quick-add-form">
	<div class="input-group">
		<input
			type="text"
			name="title"
			placeholder="input task"
			value={$quickFormState.editMode ? currentTodo.title : ''}
		/>
	</div>
	<div class="action-input-group">
		<Datepicker
			isOpen={isTimelineInputOpen}
			onClose={() => {
				isTimelineInputOpen = false;
			}}
			bind:dateValue
		>
			<button
				class="input-action timeline-input"
				type="button"
				title="Set a date"
				onclick={() => (isTimelineInputOpen = !isTimelineInputOpen)}
			>
				<div class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"
						></path></svg
					>
				</div>
				<p class="text">{dateValue ? formatTime(dateValue) : 'Date'}</p>
			</button>
		</Datepicker>
	</div>
	<div class="form-controls">
		<button type="button" onclick={closeForm} class="cancel-button">cancel</button>
		<button type="submit" class="submit-button"
			>{$quickFormState.editMode ? 'Edit task' : 'Add task'}</button
		>
	</div>
</form>

<style>
	.quick-add-form {
		width: var(--full);
		padding: var(--padding-4);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		border-radius: var(--radius-lg);
		border: 0.0625rem solid var(--color-muted);
	}

	.input-group input {
		width: 100%;
	}

	.action-input-group {
		display: flex;
		gap: var(--spacing-4);
		align-items: center;
	}

	.input-action {
		display: flex;
		gap: var(--spacing-2);
		align-items: center;
		border: 1px solid var(--color-muted);
		color: var(--color-text);
		padding: var(--padding-1);
		border-radius: var(--radius-lg);
		font-size: var(--text-sm);

		&:hover {
			background-color: var(--color-background);
		}

		.icon {
			width: var(--text-sm);
			height: var(--text-sm);
		}
	}

	.form-controls {
		width: var(--full);
		display: flex;
		justify-content: end;
		align-items: center;
		gap: var(--spacing-4);
	}

	.cancel-button,
	.submit-button {
		padding-inline: var(--padding-2);
		padding-block: var(--padding-2);
		border-radius: var(--radius-lg);
	}

	.cancel-button {
		background-color: var(--color-background);
		color: var(--color-text);
	}

	.submit-button {
		background-color: var(--color-primary);
		color: var(--color-background);
	}
</style>
