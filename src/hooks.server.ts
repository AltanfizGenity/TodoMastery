import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';
import { sendAccessToken } from '$lib/utils/jwt';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const { verify } = jwt;

export async function handle({ event, resolve }) {
	const token = event.cookies.get('accessToken');
	console.log(token);

	if (event.url.pathname.startsWith('/app')) {
		if (!token) {
			throw redirect(303, '/auth/login/');
		}

		try {
			const payload = verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
			event.locals.user = payload;
		} catch (error) {
			const refresh = event.cookies.get('refreshToken');
			if (!refresh) throw redirect(302, '/auth/login/');

			try {
				const decodedRefresh = verify(refresh, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
				const newAccessToken = jwt.sign({ id: decodedRefresh.id }, ACCESS_TOKEN_SECRET);
				sendAccessToken(event.cookies, newAccessToken);
				event.locals.user = decodedRefresh;
			} catch (error) {
				throw redirect(303, '/auth/login/');
			}
			console.error(error);
			throw redirect(303, '/auth/login/');
		}
	}

	return resolve(event);
}
