<script lang="ts">
  import { todoList } from "../stores/app.store";

  let { todo }: TodoProps = $props();

  function removeTodo() {
    $todoList = $todoList.filter((everyTodo) => everyTodo.id != todo.id);
  }
</script>

<div class="todo">
  <div class="title">{todo.title}</div>
  <button class="delete-todo-button" onclick={removeTodo}>delete</button>
</div>
