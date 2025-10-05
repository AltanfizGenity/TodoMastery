import { getUserById } from '$lib/api/db/user/get.js';
import type { Category } from '$lib/database/server/schema/categories-schema.js';

export async function load({ fetch, locals }) {
	const userId = locals.user!.id;
	const user = await getUserById(Number(userId));
	const response = await fetch('/api/categories');
	const categories = (await response.json()) as Category[];
	return {
		categories,
		user
	};
}
