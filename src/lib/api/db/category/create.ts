import type { Category, NewCategory } from '$lib/database/server/schema/categories-schema';
import { apiFetch } from '$lib/utils/api';

export async function createCategoryDB(
	newCategory: NewCategory
): Promise<ApiResponseResult<Category>> {
	return apiFetch('/api/categories', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newCategory)
	});
}
