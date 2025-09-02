import type { Todo } from '$lib/database/server/schema/todos-schema';

export async function fetchTodosFromDatabase(): Promise<ApiResponseResult<Todo[]>> {
	try {
		const response = await fetch('/api/todos');

		if (!response.ok) {
			const errorMessage = await response.text();
			return { success: false, errorMessage, data: null };
		}

		let data = (await response.json()) as Todo[];
		return { success: true, data };
	} catch (error) {
		return { success: false, data: null, errorMessage: 'Network or server error' };
	}
}
