type ClickEvent = (event: MouseEvent) => void;

interface Props {
	[key: string]: any;
}

interface EventProps extends Props {
	onclick?: (event: MouseEvent) => void;
}
interface TodoProps {
	todo: Todo;
}

interface DatepickerProps extends Props {
	isOpen: boolean;
	closePicker?: ClickEvent;
}

interface QuickTodoEditProps extends TodoProps {}

interface ShowCompleteTodoButtonProps extends EventProps {
	todoAmount?: number;
}
