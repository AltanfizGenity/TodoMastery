import { db } from '$lib/database/server/index.js';
import { json } from '@sveltejs/kit';
import { categoriesTable } from '$lib/database/server/schema/categories-schema';
import { and, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
export async function GET({ locals }) {
	let userId = locals.user!.id;
	let filteredData = [];

	try {
		if (!userId) {
			throw error(401, { message: 'Unauthorized' });
		}

		filteredData.push(eq(categoriesTable.user_id, userId));

		const categories = await db
			.select()
			.from(categoriesTable)
			.where(and(...filteredData));

		return json(categories);
	} catch (err) {
		throw error(500, { message: 'server error' });
	}
}

export async function POST({ request }) {
	const data = (await request.json()) as typeof categoriesTable.$inferInsert;
	const categories = await db.insert(categoriesTable).values(data).returning();
	return json(categories[0]);
}
