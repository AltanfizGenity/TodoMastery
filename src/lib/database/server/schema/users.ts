import { pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { created_at, id, updated_at } from './common-schema';

export const usersTable = pgTable('users', {
	id,
	name: text().notNull(),
	email: text().notNull().unique(),
	password: text().notNull(),
	created_at,
	updated_at
});

export const UserSchema = createInsertSchema(usersTable);
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
