import type { NewTodo, Todo } from '$lib/database/server/schema/todos-schema';

export async function createTodoIntoDatabase(newTodo: NewTodo): Promise<ApiResponseResult<Todo[]>> {
	try {
		let response = await fetch('/api/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newTodo)
		});

		if (!response.ok) {
			return { success: false, data: [] };
		}

		let data = (await response.json()) as Todo[];
		return { success: true, data };
	} catch (error) {
		return { success: false, data: [] };
	}
}
