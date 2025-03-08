<script lang="ts">
  import {
    todoList,
    isQuickFormOpen,
    quickTodoEditData,
  } from "../stores/app.store";
  import QuickEditTodo from "./QuickEditTodo.svelte";

  let { todo }: TodoProps = $props();

  function removeTodo() {
    $todoList = $todoList.filter((everyTodo) => everyTodo.id != todo.id);
  }

  function editTodo() {
    isQuickFormOpen.set(false);
    $quickTodoEditData = { isOpen: true, todoID: todo.id };
  }
</script>

{#if $quickTodoEditData.isOpen && $quickTodoEditData.todoID == todo.id}
  <QuickEditTodo {todo} />
{:else}
  <div class="todo">
    <div class="title">{todo.title}</div>
    <button class="delete-todo-button" onclick={removeTodo}>delete</button>
    <button class="edit-todo-button" onclick={editTodo}>edit</button>
  </div>
{/if}
