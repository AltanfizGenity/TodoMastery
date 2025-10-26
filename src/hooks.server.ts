import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';
import { sendAccessToken } from '$lib/utils/jwt';
import { error, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const { verify } = jwt;

export async function handle({ event, resolve }) {
	const accessToken = event.cookies.get('accessToken');
	const refreshToken = event.cookies.get('refreshToken');

	if (event.url.pathname.startsWith('/app')) {
		let userPayload;

		if (accessToken) {
			try {
				userPayload = verify(accessToken, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
			} catch (error) {
				console.log(error);
			}
		}

		if (refreshToken) {
			try {
				const decodedRefresh = verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
				const newAccessToken = jwt.sign({ id: decodedRefresh.id }, ACCESS_TOKEN_SECRET);
				sendAccessToken(event.cookies, newAccessToken);
				userPayload = decodedRefresh;
			} catch (error) {
				throw redirect(303, '/auth/login/');
			}
		}

		if (!userPayload) {
			throw redirect(303, '/auth/login/');
		}

		event.locals.user = userPayload;
	}

	if (event.url.pathname.startsWith('/auth/login')) {
		let userPayload;

		if (accessToken) {
			try {
				userPayload = verify(accessToken, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
			} catch (error) {
				console.log(error);
			}
		}

		if (refreshToken) {
			try {
				const decodedRefresh = verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
				const newAccessToken = jwt.sign({ id: decodedRefresh.id }, ACCESS_TOKEN_SECRET);
				sendAccessToken(event.cookies, newAccessToken);
				userPayload = decodedRefresh;
			} catch (error) {
				throw redirect(303, '/auth/login/');
			}
		}

		if (!userPayload) {
			return resolve(event);
		}

		event.locals.user = userPayload;
		redirect(303, '/app');
	}

	if (event.url.pathname.startsWith('/api/')) {
		if (!accessToken) {
			throw error(401, 'Unauthorized');
		}

		try {
			const payload = verify(accessToken, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
			event.locals.user = payload;
		} catch (err) {
			throw error(500, 'Internal Server Error');
		}
	}

	return resolve(event);
}
