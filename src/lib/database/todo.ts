import { getLocalStorageData, saveToLocalStorage } from './db';

export function saveTodos(todos: Todo[]) {
	saveToLocalStorage('todos', JSON.stringify(todos));
}

export function fetchTodos() {
	return JSON.parse(getLocalStorageData('todos') ?? '[]');
}
