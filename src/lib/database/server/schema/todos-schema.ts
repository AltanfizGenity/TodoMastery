import { boolean, date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { categoriesTable } from './categories-schema';
import { created_at, id, updated_at } from './common-schema';
import { usersTable } from './users';

export const todosTable = pgTable('todos', {
	id,
	title: text().notNull(),
	dueDate: date(),
	completed: boolean().default(false).notNull(),
	category_id: integer().references(() => categoriesTable.id, { onDelete: 'set null' }),
	user_id: integer()
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	created_at,
	updated_at
});

export const TodoSchema = createInsertSchema(todosTable);
export type Todo = typeof todosTable.$inferSelect;
export type NewTodo = typeof todosTable.$inferInsert;
