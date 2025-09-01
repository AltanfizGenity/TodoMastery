import { db } from '$lib/database/server';
import { todosTable } from '$lib/database/server/schema/todos-schema';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function DELETE({ params }) {
	const todoId = Number(params.id);

	if (isNaN(todoId)) {
		throw error(400, 'Invalid task ID');
	}

	const existingTodo = await db.select().from(todosTable).where(eq(todosTable.id, todoId));

	if (existingTodo.length === 0) {
		throw error(404, 'task not found');
	}

	const deletedTodos = await db.delete(todosTable).where(eq(todosTable.id, todoId)).returning();
	return json(deletedTodos[0], { status: 200 });
}
