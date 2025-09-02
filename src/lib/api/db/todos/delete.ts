import type { Todo } from '$lib/database/server/schema/todos-schema';
import { apiFetch } from '$lib/utils/api';

export async function deleteTodoFromDatabase(todoId: number): Promise<ApiResponseResult<Todo[]>> {
	return apiFetch(`/api/todos/${todoId}`, {
		method: 'DELETE'
	});
}
