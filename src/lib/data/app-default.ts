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

export const tagStyles = {
	// Primary Colors
	red: 'bg-red-100 text-red-800 border border-red-200',
	blue: 'bg-blue-100 text-blue-800 border border-blue-200',
	green: 'bg-green-100 text-green-800 border border-green-200',
	yellow: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
	purple: 'bg-purple-100 text-purple-800 border border-purple-200',
	pink: 'bg-pink-100 text-pink-800 border border-pink-200',
	indigo: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
	gray: 'bg-gray-100 text-gray-800 border border-gray-200',

	// Status Colors
	success: 'bg-green-100 text-green-800 border border-green-200',
	warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
	error: 'bg-red-100 text-red-800 border border-red-200',
	info: 'bg-blue-100 text-blue-800 border border-blue-200',

	// Dark Variants (more prominent)
	darkRed: 'bg-red-600 text-white border border-red-700',
	darkBlue: 'bg-blue-600 text-white border border-blue-700',
	darkGreen: 'bg-green-600 text-white border border-green-700',

	// Gradient Variants
	gradientBlue: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
	gradientPurple: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
	gradientTeal: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
} as const;

export type TagColor = keyof typeof tagStyles;
