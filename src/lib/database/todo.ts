import { getLocalStorageData, saveToLocalStorage } from './db';

export function saveTodos(todos: Todo[]) {
	saveToLocalStorage('todos', JSON.stringify(todos));
}

export function fetchTodos() {
	return JSON.parse(getLocalStorageData('todos') ?? '[]');
}

export function saveCateogies(categories: string[]) {
	saveToLocalStorage('todo-categories', JSON.stringify(categories));
}

export function fetchCategories() {
	return JSON.parse(getLocalStorageData('todo-categories') ?? '[]');
}
