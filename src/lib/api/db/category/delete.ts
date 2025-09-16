import type { Category } from '$lib/database/server/schema/categories-schema';
import { apiFetch } from '$lib/utils/api';

export async function deleteCategoryDB(categoryId: number): Promise<ApiResponseResult<Category[]>> {
	return apiFetch(`/api/categories/${categoryId}`, {
		method: 'DELETE'
	});
}
