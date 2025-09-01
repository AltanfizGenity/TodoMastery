import type { Todo } from '$lib/database/server/schema/todos-schema';

export async function deleteTodoFromDatabase(todoId: number): Promise<ResponseResult<Todo[]>> {
	try {
		if (!Number.isFinite(todoId)) {
			return { success: false, errorMessage: 'Invalid todo ID', data: null };
		}
		const response = await fetch(`/api/todos/${todoId}`, { method: 'DELETE' });

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
