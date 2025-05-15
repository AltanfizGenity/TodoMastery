import { derived, writable } from 'svelte/store';

export let quickFormState = writable<QuickFormState>({
	isOpen: false,
	editMode: false,
	todoID: '',
	date: null
});

export let currentAppPage = writable<AppPage>('inbox');
export let isSearchboxOpen = writable<boolean>(false);
export let isTodoFormOpen = writable<boolean>(false);
export let isShowCompleteTodo = writable<boolean>(false);
export let todoList = writable<Todo[]>([]);
export let uncompletedTodos = derived(todoList, (todos) =>
	todos.filter((todo) => !todo.isComplete)
);
