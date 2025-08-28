export function getUncompletedTodos(todos: Todo[]) {
	return todos.filter((todo) => !todo.completed);
}

export function getCompletedTodos(todos: Todo[]) {
	return todos.filter((todo) => todo.completed);
}

function isToday(date: Date) {
	const today = new Date();
	return (
		date.getDate() == today.getDate() &&
		date.getMonth() == today.getMonth() &&
		date.getFullYear() == today.getFullYear()
	);
}

export function getTodayTodos(todos: Todo[]) {
	return todos.filter((todo) => !todo.completed && todo.dueDate && isToday(new Date(todo.dueDate)));
}
