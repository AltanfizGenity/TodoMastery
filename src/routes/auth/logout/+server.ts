import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	cookies.delete('refreshtoken', { path: '/' });
	cookies.delete('accessToken', { path: '/' });
	return json({ success: true, message: 'Logout successful' });
}
