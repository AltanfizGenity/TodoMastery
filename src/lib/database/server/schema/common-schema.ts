import { integer, timestamp } from 'drizzle-orm/pg-core';

export const id = integer().primaryKey().generatedAlwaysAsIdentity();
export const created_at = timestamp().defaultNow().notNull();
export const updated_at = timestamp()
	.defaultNow()
	.$onUpdate(() => new Date());
