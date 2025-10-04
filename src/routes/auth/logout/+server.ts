import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	cookies.delete('refreshtoken', { path: '/' });
	return json({ success: true, message: 'Logout successful' });
}
