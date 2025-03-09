<script lang="ts">
  import { isQuickFormOpen, quickTodoEditData } from "../stores/app.store";

  function handleClick() {
    isQuickFormOpen.set(true);
    quickTodoEditData.set({ isOpen: false, todoID: "" });
  }
</script>

<button
  id="quick-add-button"
  class="flex gap-2 items-center justify-center"
  onclick={handleClick}
>
  <div class="icon w-5 h-5 text-primary">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      ><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg
    >
  </div>
  <div class="text">Add Task</div>
</button>
