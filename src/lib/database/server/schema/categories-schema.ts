import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { created_at, id, updated_at } from './common-schema';
import { createInsertSchema } from 'drizzle-zod';
import { usersTable } from './users';

export const categoriesTable = pgTable('categories', {
	id,
	name: text().notNull().unique(),
	user_id: integer()
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	created_at,
	updated_at
});

export const CategorySchema = createInsertSchema(categoriesTable);
export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;
