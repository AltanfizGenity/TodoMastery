type ClickEvent = (event: MouseEvent) => void;

interface Props {
	[key: string]: any;
}

interface EventProps {
	onclick?: (event: MouseEvent) => void;
}

interface ElementProps extends EventProps {
	classname?: string;
}

interface ButtonProps extends ElementProps {
	text?: string;
	disabled?: boolean;
}

interface IconButtonProps extends ButtonProps {
	Icon: SvelteComponent;
}

interface TodoProps {
	todo: Todo;
}

interface DatepickerProps extends Props {
	onClose: Function;
	isOpen: boolean;
	dateValue: LuxonTime | null;
}

interface QuickTodoEditProps extends TodoProps {}

interface ShowCompleteTodoButtonProps extends EventProps {
	todoAmount?: number;
}
