import type { Todo } from '$lib/database/server/schema/todos-schema.js';
import { DateTime } from 'luxon';

export async function load({ fetch }) {
	let todayDate = DateTime.now().toISODate();
	const response = await fetch(`/api/todos?dueDate=${todayDate}`);
	const todos = (await response.json()) as Todo[];
	return {
		todos,
		pageTitle: 'today'
	};
}
