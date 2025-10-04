import { db } from '$lib/database/server/index.js';
import { usersTable } from '$lib/database/server/schema/users.js';
import { fail } from '@sveltejs/kit';
import { verify } from 'argon2';
import { eq } from 'drizzle-orm';
import { createAccessToken, createRefreshToken } from '$lib/utils/jwt.js';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { message: 'Missing fields' });
		}

		try {
			const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
			const user = users[0];

			if (!user) {
				return fail(404, { message: 'User not found' });
			}

			const isPasswordCorrect = await verify(user.password, password);
			if (!isPasswordCorrect) {
				return fail(401, { message: 'Invalid password' });
			}

			const accessToken = await createAccessToken(user.id.toString());
			const refreshToken = await createRefreshToken(user.id.toString());

			cookies.set('refreshtoken', refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24 * 30
			});

			return { accessToken, refreshToken, success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Error logging in!' });
		}
	}
};
