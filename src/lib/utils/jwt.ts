import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import { SignJWT } from 'jose';

const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);
const accessTokenSecret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);

export const createAccessToken = async (id: string) => {
	return await new SignJWT({ id })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1d')
		.sign(accessTokenSecret);
};

export const createRefreshToken = async (id: string) => {
	return await new SignJWT({ id })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('90d')
		.sign(refreshTokenSecret);
};

export const sendRefreshToken = (cookies: Cookies, refreshToken: string) => {
	cookies.set('refreshtoken', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});
};

export const sendAccessToken = (cookies: Cookies, accessToken: string) => {
	cookies.set('accessToken', accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60
	});
};
