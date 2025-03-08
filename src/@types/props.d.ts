interface EventProps {
  onclick?: (event: MouseEvent) => void;
}

interface TodoProps {
  todo: Todo;
}

interface QuickTodoEditProps extends TodoProps {}
