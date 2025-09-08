import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const categoriesTable = pgTable('categories', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text().notNull().unique(),
	updated_at: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
	created_at: timestamp().defaultNow().notNull()
});

export const CategorySchema = createInsertSchema(categoriesTable);
export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;
