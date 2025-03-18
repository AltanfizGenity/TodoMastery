<script lang="ts">
  import { isShowCompleteTodo } from "../stores/app.store";

  let { todoAmount }: ShowCompleteTodoButtonProps = $props();

  function toggleShowCompletedTodo() {
    $isShowCompleteTodo = !$isShowCompleteTodo;
  }
</script>

<button
  class="show-completed-todo-button icon-text-button"
  onclick={toggleShowCompletedTodo}
  data-isShow={$isShowCompleteTodo}
>
  <div class="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      ><path
        d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"
      ></path></svg
    >
  </div>
  <div class="text">Show completed {todoAmount ? `(${todoAmount})` : ""}</div>
</button>

<style>
  .icon {
    color: var(--color-text);
    transition: var(--transition-fast);
    rotate: 0deg;
  }

  .show-completed-todo-button[data-isShow="true"] .icon {
    rotate: 90deg;
  }
</style>
