<script lang="ts">
  import { quickFormState, todoList } from "../stores/app.store";

  let currentTodo: Todo = $quickFormState.editMode
    ? ($todoList.find((todo) => todo.id == $quickFormState.todoID) as Todo)
    : { id: "", title: "", isComplete: false };

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    let formData: FormData = new FormData(event.target as HTMLFormElement);

    if ($quickFormState.editMode) {
      editTodo(formData);
      return;
    }

    addTodo(formData);
  }

  function editTodo(formData: FormData) {
    let editTodo: Todo = {
      ...currentTodo,
      title: formData.get("title") as string,
    };

    $todoList = $todoList.map((everyTodo) =>
      everyTodo.id == currentTodo.id ? editTodo : everyTodo
    );

    closeForm();
  }

  function addTodo(formData: FormData) {
    let newTodo: Todo = {
      title: formData.get("title") as string,
      id: Date.now().toString(),
      isComplete: false,
    };

    $todoList = [...$todoList, newTodo];
  }

  function closeForm() {
    if ($quickFormState.editMode) {
      $quickFormState = {
        ...$quickFormState,
        isOpen: false,
        editMode: false,
        todoID: "",
      };
      return;
    }

    $quickFormState.isOpen = false;
  }
</script>

<form onsubmit={handleSubmit} class="quick-add-form">
  <input
    type="text"
    name="title"
    placeholder="input task"
    value={$quickFormState.editMode ? currentTodo.title : ""}
  />
  <div class="form-controls">
    <button type="button" onclick={closeForm} class="cancel-button"
      >cancel</button
    >
    <button type="submit" class="submit-button"
      >{$quickFormState.editMode ? "Edit task" : "Add task"}</button
    >
  </div>
</form>

<style>
  .quick-add-form {
    width: var(--full);
    padding: var(--padding-4);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    border-radius: var(--radius-lg);
    border: 0.0625rem solid var(--color-muted);
  }

  .form-controls {
    width: var(--full);
    display: flex;
    justify-content: end;
    align-items: center;
    gap: var(--spacing-4);
  }

  .cancel-button,
  .submit-button {
    padding-inline: var(--padding-2);
    padding-block: var(--padding-2);
    border-radius: var(--radius-lg);
  }

  .cancel-button {
    background-color: var(--color-background);
    color: var(--color-text);
  }

  .submit-button {
    background-color: var(--color-primary);
    color: var(--color-background);
  }
</style>
