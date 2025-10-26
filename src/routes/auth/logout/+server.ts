import { json, redirect } from '@sveltejs/kit';

export async function GET({ cookies }) {
	cookies.delete('refreshToken', { path: '/' });
	cookies.delete('accessToken', { path: '/' });
	return redirect(302, '/');
}
