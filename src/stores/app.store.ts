import { writable } from "svelte/store";

export let isQuickFormOpen = writable<boolean>(false);
export let quickTodoEditData = writable<QuickTodoEdit>({
  isOpen: false,
  todoID: "",
});
export let todoList = writable<Todo[]>([]);
