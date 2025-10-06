import type { Todo } from '$lib/database/server/schema/todos-schema.js';

export async function load({ fetch }) {
	const response = await fetch('/api/todos?completed=false', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	const todos = (await response.json()) as Todo[];
	return {
		todos,
		pageTitle: 'todos'
	};
}
