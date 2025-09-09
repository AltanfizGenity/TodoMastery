import { pgTable, text } from 'drizzle-orm/pg-core';
import { created_at, id, updated_at } from './common-schema';
import { createInsertSchema } from 'drizzle-zod';

export const categoriesTable = pgTable('categories', {
	id,
	name: text().notNull().unique(),
	created_at,
	updated_at
});

export const CategorySchema = createInsertSchema(categoriesTable);
export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;
