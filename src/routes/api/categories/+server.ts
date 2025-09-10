import { db } from '$lib/database/server/index.js';
import { json } from '@sveltejs/kit';

import { categoriesTable } from '$lib/database/server/schema/categories-schema';
export async function GET() {
	const categories = await db.select().from(categoriesTable);
	return json(categories);
}

export async function POST({ request }) {
	const data = (await request.json()) as typeof categoriesTable.$inferInsert;
	const categories = await db.insert(categoriesTable).values(data).returning();
	return json(categories[0]);
}
