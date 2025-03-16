<script lang="ts">
  import { todoList } from "../stores/app.store";
  import ShowCompletedTodo from "./ShowCompletedTodo.svelte";
  import TodoElement from "./TodoElement.svelte";

  let completeTodos = $derived<Todo[]>(
    $todoList.filter((everyTodo) => everyTodo.isComplete == true)
  );
</script>

<div class="completed-list-view">
  <ShowCompletedTodo />
  <div class="list-view">
    {#each completeTodos as todo}
      <TodoElement {todo} />
    {/each}
  </div>
</div>

<style>
  .completed-list-view {
    width: var(--full);
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .list-view {
    width: var(--full);
  }
</style>
