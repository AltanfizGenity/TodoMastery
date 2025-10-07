import { db } from '$lib/database/server/index.js';
import { todosTable } from '$lib/database/server/schema/todos-schema.js';
import { fail, json } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export async function GET({ url, locals }) {
	let userId = locals.user!.id;
	let completedParam = url.searchParams.get('completed');
	let dueDateParam = url.searchParams.get('dueDate');
	let filteredData = [];

	try {
		if (!userId) {
			throw fail(401, { message: 'Unauthorized' });
		}

		filteredData.push(eq(todosTable.user_id, userId));

		if (completedParam) {
			const completed = completedParam === 'true';
			filteredData.push(eq(todosTable.completed, completed));
		}

		if (dueDateParam) {
			filteredData.push(eq(todosTable.dueDate, dueDateParam));
		}

		const todos = await db
			.select()
			.from(todosTable)
			.where(and(...filteredData));

		return json(todos);
	} catch (error) {
		throw fail(500, { message: 'server error' });
	}
}

export async function POST({ request }) {
	const data = (await request.json()) as typeof todosTable.$inferInsert;
	const todos = await db.insert(todosTable).values(data).returning();
	return json(todos);
}
