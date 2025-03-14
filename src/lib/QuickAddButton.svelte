<script lang="ts">
  import { quickFormState } from "../stores/app.store";

  function handleClick() {
    quickFormState.set({ isOpen: true, editMode: false, todoID: "" });
  }
</script>

<button class="quick-add-button" onclick={handleClick}>
  <div class="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      ><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg
    >
  </div>
  <div class="text">Add Task</div>
</button>

<style lang="scss">
  @forward "../style/quick-add-button.scss";
</style>
