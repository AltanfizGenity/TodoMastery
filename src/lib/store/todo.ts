import type { Todo } from '$lib/database/server/schema/todos-schema';
import { writable } from 'svelte/store';

export const todos = writable<Todo[]>([]);
