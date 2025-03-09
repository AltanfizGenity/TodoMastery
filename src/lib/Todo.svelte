<script lang="ts">
  import { todoList, quickFormState } from "../stores/app.store";
  import QuickForm from "./QuickForm.svelte";

  let { todo }: TodoProps = $props();

  function removeTodo() {
    $todoList = $todoList.filter((everyTodo) => everyTodo.id != todo.id);
  }

  function editTodo() {
    quickFormState.set({ editMode: true, isOpen: true, todoID: todo.id });
  }
</script>

{#if $quickFormState.isOpen && $quickFormState.todoID == todo.id}
  <QuickForm />
{:else}
  <div class="todo">
    <div class="title font-light">{todo.title}</div>
    <div class="actions">
      <button
        class="delete-todo-button"
        onclick={removeTodo}
        aria-label="delete button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          ><path
            d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
          ></path></svg
        >
      </button>
      <button
        class="edit-todo-button"
        onclick={editTodo}
        aria-label="edit button"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          ><path
            d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"
          ></path></svg
        ></button
      >
    </div>
  </div>
{/if}
