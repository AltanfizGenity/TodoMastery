import { db } from '$lib/database/server';
import { todosTable } from '$lib/database/server/schema/todos-schema';
export async function load() {
	const todos = await db.select().from(todosTable);
	return {
		todos,
		pageTitle: 'todos'
	};
}
