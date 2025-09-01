import type { Todo } from '$lib/database/server/schema/todos-schema.js';

export async function load({ fetch }) {
	const response = await fetch('/api/todos?completed=true');
	const todos = (await response.json()) as Todo[];
	return {
		todos,
		pageTitle: 'completed'
	};
}
