import { db } from '$lib/database/server';
import { TodoSchema, todosTable, type Todo } from '$lib/database/server/schema/todos-schema';
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

export async function PATCH({ params, request }) {
	const todoId = Number(params.id);
	const body = (await request.json()) as Partial<Todo>;

	if (isNaN(todoId)) {
		throw error(400, 'Invalid task ID');
	}

	const updates: Record<string, any> = {};

	let todoKeys = TodoSchema.keyof().options as Array<string>;

	Object.keys(body).forEach((key) => {
		if (todoKeys.includes(key)) {
			updates[key] = body[key as keyof Todo];
		}
	});

	if (Object.keys(updates).length === 0) {
		throw error(400, 'No valid field to update');
	}

	let updatedTodos = await db
		.update(todosTable)
		.set(updates)
		.where(eq(todosTable.id, todoId))
		.returning();
	return json(updatedTodos[0], { status: 200 });
}
