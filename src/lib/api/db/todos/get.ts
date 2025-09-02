import type { Todo } from '$lib/database/server/schema/todos-schema';
import { apiFetch } from '$lib/utils/api';

export async function fetchTodosFromDatabase(): Promise<ApiResponseResult<Todo[]>> {
	return apiFetch(`/api/todos/`);
}
