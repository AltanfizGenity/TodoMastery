interface Todo {
	id: string;
	title: string;
	isComplete: boolean;
	date: LuxonTime | null;
}

interface QuickTodoEdit {
	todoID: string;
	isOpen: boolean;
}
