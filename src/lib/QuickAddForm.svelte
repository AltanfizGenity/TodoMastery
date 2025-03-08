<script lang="ts">
  import { isQuickFormOpen, todoList } from "../stores/app.store";

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    let formData: FormData = new FormData(event.target as HTMLFormElement);
    let newTodo: Todo = {
      title: formData.get("title") as string,
      id: Date.now().toString(),
    };

    $todoList = [...$todoList, newTodo];
  }

  function cancel() {
    isQuickFormOpen.set(false);
  }
</script>

<form onsubmit={handleSubmit}>
  <input type="text" name="title" placeholder="input task" />
  <button type="button" onclick={cancel}>cancel</button>
  <button type="submit">add task</button>
</form>
