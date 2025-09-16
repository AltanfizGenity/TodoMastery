import { db } from '$lib/database/server';
import { categoriesTable } from '$lib/database/server/schema/categories-schema.js';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function DELETE({ params }) {
	const id = Number(params.id);

	if (isNaN(id)) {
		throw error(400, 'Invalid category ID');
	}

	const existingCategory = await db
		.select()
		.from(categoriesTable)
		.where(eq(categoriesTable.id, id));

	if (existingCategory.length === 0) {
		throw error(404, 'category not found');
	}

	const deletedItem = await db
		.delete(categoriesTable)
		.where(eq(categoriesTable.id, id))
		.returning();
	return json(deletedItem[0], { status: 200 });
}
