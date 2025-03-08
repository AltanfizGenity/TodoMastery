<script lang="ts">
  import { quickTodoEditData, todoList } from "../stores/app.store";

  let { todo }: QuickTodoEditProps = $props();

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    let formData: FormData = new FormData(event.target as HTMLFormElement);
    let editTodo: Todo = {
      ...todo,
      title: formData.get("title") as string,
    };

    $todoList = $todoList.map((everyTodo) =>
      everyTodo.id == todo.id ? editTodo : everyTodo
    );

    cancel();
  }

  function cancel() {
    $quickTodoEditData = { ...$quickTodoEditData, isOpen: false };
  }
</script>

<form onsubmit={handleSubmit}>
  <input type="text" name="title" placeholder="input task" value={todo.title} />
  <button type="button" onclick={cancel}>cancel</button>
  <button type="submit">edit task</button>
</form>
