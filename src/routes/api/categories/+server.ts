import { db } from '$lib/database/server/index.js';
import { json } from '@sveltejs/kit';

import { categoriesTable } from '$lib/database/server/schema/categories-schema';
export async function GET() {
	const categories = await db.select().from(categoriesTable);
	return json(categories);
}
