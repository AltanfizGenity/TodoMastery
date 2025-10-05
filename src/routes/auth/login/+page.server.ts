import { fail } from '@sveltejs/kit';
import { verify } from 'argon2';
import {
	createAccessToken,
	createRefreshToken,
	sendAccessToken,
	sendRefreshToken
} from '$lib/utils/jwt.js';
import { getUserByEmail } from '$lib/api/db/user/get.js';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { message: 'Missing fields' });
		}

		try {
			const user = await getUserByEmail(email);
			if (!user) {
				return fail(404, { message: 'User not found' });
			}

			const isPasswordCorrect = await verify(user.password, password);
			if (!isPasswordCorrect) {
				return fail(401, { message: 'Invalid password' });
			}

			const accessToken = await createAccessToken(user.id.toString());
			const refreshToken = await createRefreshToken(user.id.toString());
			sendRefreshToken(cookies, refreshToken);
			sendAccessToken(cookies, accessToken);
			return { success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Error logging in!' });
		}
	}
};
