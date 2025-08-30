import type { Todo } from '$lib/database/server/schema/todos-schema';
import { writable } from 'svelte/store';

export const todos = writable<Todo[]>([]);

function setTodoCompleted(todoId: number, completed: boolean) {
	todos.update((currentTodos) =>
		currentTodos.map((todo) => (todo.id === todoId ? { ...todo, completed } : todo))
	);
}
export function deleteTodo(todoId: number) {
	todos.update((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
}

export const completeTodo = (todoId: number) => setTodoCompleted(todoId, true);
export const incompleteTodo = (todoId: number) => setTodoCompleted(todoId, false);
