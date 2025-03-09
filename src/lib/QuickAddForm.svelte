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

<form
  onsubmit={handleSubmit}
  class="quick-add-form w-full p-4 rounded-xl border border-muted flex flex-col gap-4"
>
  <input type="text" name="title" placeholder="input task" class="outline-0" />
  <div class="actions w-full flex justify-end items-center gap-4">
    <button
      type="button"
      onclick={cancel}
      class="px-4 py-2 bg-background text-text rounded-xl">cancel</button
    >
    <button
      type="submit"
      class="px-4 py-2 bg-primary text-background rounded-xl">add task</button
    >
  </div>
</form>
