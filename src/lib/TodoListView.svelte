<script lang="ts">
  import { todoList } from "../stores/app.store";
  import TodoElement from "./TodoElement.svelte";
</script>

<div class="todo-list-view">
  {#each $todoList as todo}
    {#if !todo.isComplete}
      <TodoElement {todo} />
    {/if}
  {/each}
</div>

<style>
  .todo-list-view {
    width: var(--full);
    display: flex;
    flex-direction: column;
  }
</style>
