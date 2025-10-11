import { db } from '$lib/database/server';
import { usersTable } from '$lib/database/server/schema/users';
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email: string) {
	const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
	const user = users[0];

	if (!user) {
		return null;
	}

	return user;
}

export async function getUserById(id: number) {
	const users = await db.select().from(usersTable).where(eq(usersTable.id, id));
	const user = users[0];

	if (!user) {
		return null;
	}

	return user;
}
