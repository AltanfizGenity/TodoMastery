interface Props {
  [key: string]: any;
}

interface EventProps extends Props {
  onclick?: (event: MouseEvent) => void;
}
interface TodoProps {
  todo: Todo;
}

interface QuickTodoEditProps extends TodoProps {}
