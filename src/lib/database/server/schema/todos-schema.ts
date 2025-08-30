import { boolean, date, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const todosTable = pgTable('todos', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: text().notNull(),
	category: text(),
	dueDate: date(),
	completed: boolean().default(false).notNull(),
	createdAt: timestamp().defaultNow().notNull()
});

export type Todo = typeof todosTable.$inferSelect;
export type NewTodo = typeof todosTable.$inferInsert;
