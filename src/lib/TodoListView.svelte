<script lang="ts">
  import { todoList } from "../stores/app.store";
</script>

<div class="todo-list-view">
  {#each $todoList as todo}
    <p>{todo.title}</p>
  {/each}
</div>
