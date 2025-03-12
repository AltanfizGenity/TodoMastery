<script lang="ts">
  import { todoList } from "../stores/app.store";
  import TodoElement from "./TodoElement.svelte";
</script>

<div class="todo-list-view w-full flex flex-col">
  {#each $todoList as todo}
    {#if !todo.isComplete}
      <TodoElement {todo} />
    {/if}
  {/each}
</div>
