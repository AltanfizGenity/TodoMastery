import { boolean, date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { categoriesTable } from './categories-schema';
import { created_at, id, updated_at } from './common-schema';

export const todosTable = pgTable('todos', {
	id,
	title: text().notNull(),
	category_id: integer().references(() => categoriesTable.id),
	dueDate: date(),
	completed: boolean().default(false).notNull(),
	created_at,
	updated_at
});

export const TodoSchema = createInsertSchema(todosTable);
export type Todo = typeof todosTable.$inferSelect;
export type NewTodo = typeof todosTable.$inferInsert;
