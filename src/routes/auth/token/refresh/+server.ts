import { REFRESH_TOKEN_SECRET } from '$env/static/private';
import { getUserById } from '$lib/api/db/user/get.js';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '$lib/utils/jwt.js';
import { json } from '@sveltejs/kit';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
export async function GET({ cookies }) {
	try {
		const refreshToken = cookies.get('refreshtoken');
		if (!refreshToken) {
			return json({ success: false, message: 'Refresh token not found' });
		}

		const payload = verify(refreshToken, REFRESH_TOKEN_SECRET) as pkg.JwtPayload;
		const userId = payload.id as string;
		const user = getUserById(Number(userId));

		if (!user) {
			return json({ success: false, message: 'User does not exist' });
		}

		const newAccessToken = await createAccessToken(userId);
		const newRefreshToken = await createRefreshToken(userId);
		sendRefreshToken(cookies, newRefreshToken);

		console.log(newAccessToken, newRefreshToken);

		return json({ success: true, accessToken: newAccessToken });
	} catch (error) {
		console.error(error);
		return json({ success: false, message: 'Invalid refresh token' });
	}
}
