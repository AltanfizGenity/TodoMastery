import { getLocalStorageData, saveToLocalStorage } from './db';

export function saveTodos(todos: Todo[]) {
	saveToLocalStorage('todos', JSON.stringify(todos));
}

export function fetchTodos() {
	return JSON.parse(getLocalStorageData('todos') ?? '[]');
}

export function saveTags(tags: string[]) {
	saveToLocalStorage('tags', JSON.stringify(tags));
}

export function fetchTags() {
	return JSON.parse(getLocalStorageData('tags') ?? '[]');
}
