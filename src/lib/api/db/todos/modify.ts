import type { Todo } from '$lib/database/server/schema/todos-schema';
import { apiFetch } from '$lib/utils/api';

export async function updateTodoCompletionDB(
	todoId: number,
	completed: boolean = true
): Promise<ApiResponseResult<Todo>> {
	return apiFetch(`/api/todos/${todoId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ completed })
	});
}
