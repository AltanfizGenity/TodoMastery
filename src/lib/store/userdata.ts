import { defaultCategories } from '$lib/data/app-default';
import type { Category } from '$lib/database/server/schema/categories-schema';
import { writable } from 'svelte/store';

export const categories = writable<Category[]>(defaultCategories);
