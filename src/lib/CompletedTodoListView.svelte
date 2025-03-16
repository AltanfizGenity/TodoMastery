<script lang="ts">
  import { isShowCompleteTodo, todoList } from "../stores/app.store";
  import ShowCompletedTodo from "./ShowCompletedTodo.svelte";
  import TodoElement from "./TodoElement.svelte";

  let completeTodos = $derived<Todo[]>(
    $todoList.filter((everyTodo) => everyTodo.isComplete == true)
  );
</script>

<div class="completed-list-view">
  <ShowCompletedTodo />
  {#if $isShowCompleteTodo}
    <div class="list-view">
      {#each completeTodos as todo}
        <TodoElement {todo} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .completed-list-view {
    width: var(--full);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--spacing-4);
  }

  .list-view {
    width: var(--full);
  }
</style>
