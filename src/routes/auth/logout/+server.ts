import { json, redirect } from '@sveltejs/kit';

export async function GET({ cookies }) {
	cookies.delete('refreshtoken', { path: '/' });
	cookies.delete('accessToken', { path: '/' });
	return redirect(302, '/');
}
