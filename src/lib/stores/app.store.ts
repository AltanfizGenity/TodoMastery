import { writable } from 'svelte/store';

export let quickFormState = writable<QuickFormState>({
	isOpen: false,
	editMode: false,
	todoID: '',
	date: null
});

export let isShowCompleteTodo = writable<boolean>(false);
export let todoList = writable<Todo[]>([]);
