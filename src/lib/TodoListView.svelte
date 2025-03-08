<script lang="ts">
  import { todoList } from "../stores/app.store";
  import Todo from "./Todo.svelte";
</script>

<div class="todo-list-view">
  {#each $todoList as todo}
    <Todo {todo} />
  {/each}
</div>
