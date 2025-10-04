import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

export const createAccessToken = async (id: string) => {
	return await new SignJWT({ id })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1d')
		.sign(secret);
};

export const createRefreshToken = async (id: string) => {
	return await new SignJWT({ id })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('90d')
		.sign(secret);
};
