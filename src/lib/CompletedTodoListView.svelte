<script lang="ts">
  import { todoList } from "../stores/app.store";
  import TodoElement from "./TodoElement.svelte";

  let completeTodos = $derived<Todo[]>(
    $todoList.filter((everyTodo) => everyTodo.isComplete == true)
  );
</script>

<div class="completed-list-view w-full flex flex-col items-start">
  <button class="show-completed-todo-button">Show completed</button>
  <div class="complete-todo-list-view w-full">
    {#each completeTodos as todo}
      <TodoElement {todo} />
    {/each}
  </div>
</div>
