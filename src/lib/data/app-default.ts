import type { Category } from '$lib/database/server/schema/categories-schema';

export let defaultCategories: Category[] = [
	{
		id: 1,
		name: 'Work',
		updated_at: new Date(),
		created_at: new Date()
	},
	{
		id: 2,
		name: 'Personal',
		updated_at: new Date(),
		created_at: new Date()
	}
];
