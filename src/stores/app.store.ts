import { writable } from "svelte/store";

export let isQuickFormOpen = writable<boolean>(false);
export let todoList = writable<Todo[]>([]);
