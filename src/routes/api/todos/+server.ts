import { db } from '$lib/database/server/index.js';
import { todosTable } from '$lib/database/server/schema/todos-schema.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const todos = await db.select().from(todosTable);
	return json(todos);
}

export async function POST({ request }) {
	const data = (await request.json()) as typeof todosTable.$inferInsert;
	const todos = await db.insert(todosTable).values(data).returning();
	return json(todos);
}
