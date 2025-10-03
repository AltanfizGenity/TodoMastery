import { db } from '$lib/database/server/index.js';
import { usersTable, type NewUser } from '$lib/database/server/schema/users.js';
import { fail } from '@sveltejs/kit';
import { hash } from 'argon2';
import { eq } from 'drizzle-orm';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();
		const email = data.get('email')?.toString();

		if (!username || !password || !email) {
			return fail(400, { message: 'Missing fields' });
		}

		try {
			const user = await db.select().from(usersTable).where(eq(usersTable.email, email));

			console.log(user);

			if (user.length > 0) {
				return fail(500, { message: 'User already exists' });
			}

			const hashedPassword = await hash(password);
			const newUser: NewUser = {
				name: username,
				email,
				password: hashedPassword
			};

			await db.insert(usersTable).values(newUser);
			return { success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Error creating user!' });
		}
	}
};
