import { writable } from 'svelte/store';

export const todos = writable<Todo[]>([]);

function setTodoCompleted(todoId: string, completed: boolean) {
	todos.update((currentTodos) =>
		currentTodos.map((todo) => (todo.id === todoId ? { ...todo, completed } : todo))
	);
}
export function deleteTodo(todoId: string) {
	todos.update((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
}

export const completeTodo = (todoId: string) => setTodoCompleted(todoId, true);
export const incompleteTodo = (todoId: string) => setTodoCompleted(todoId, false);
