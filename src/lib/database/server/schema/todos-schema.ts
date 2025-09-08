import { boolean, date, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { categoriesTable } from './categories-schema';

export const todosTable = pgTable('todos', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: text().notNull(),
	category_id: integer().references(() => categoriesTable.id),
	dueDate: date(),
	completed: boolean().default(false).notNull(),
	update_at: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
	created_at: timestamp().defaultNow().notNull()
});

export const TodoSchema = createInsertSchema(todosTable);
export type Todo = typeof todosTable.$inferSelect;
export type NewTodo = typeof todosTable.$inferInsert;
