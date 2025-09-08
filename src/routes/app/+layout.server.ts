import type { Category } from '$lib/database/server/schema/categories-schema.js';

export async function load({ fetch }) {
	const response = await fetch('/api/categories');
	const categories = (await response.json()) as Category[];
	return {
		categories
	};
}
