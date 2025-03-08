<script lang="ts">
  import { isQuickFormOpen } from "../stores/app.store";

  function handleClick() {
    isQuickFormOpen.set(true);
  }
</script>

<button class="quick-add-button" onclick={handleClick}>Add task</button>
