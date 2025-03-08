<script lang="ts">
  import { isQuickFormOpen, quickTodoEditData } from "../stores/app.store";

  function handleClick() {
    isQuickFormOpen.set(true);
    quickTodoEditData.set({ isOpen: false, todoID: "" });
  }
</script>

<button class="quick-add-button" onclick={handleClick}>Add task</button>
