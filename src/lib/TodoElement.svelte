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

  function completeTodo() {
    $todoList = $todoList.map((everyTodo) => {
      if (everyTodo.id == todo.id) {
        return { ...everyTodo, isComplete: true };
      }
      return everyTodo;
    });
  }
</script>

{#if $quickFormState.isOpen && $quickFormState.todoID == todo.id}
  <QuickForm />
{:else}
  <div class={`todo ${todo.isComplete ? "complete" : ""}`}>
    <div class="title font-light">{todo.title}</div>
    <div class="actions">
      <button
        class="complete-todo-button"
        onclick={completeTodo}
        aria-label="complete button"
      >
        <svg
          class="uncheck-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          ><path
            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
          ></path></svg
        ><svg
          class="check-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          ><path
            d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.4571 9.45711L16.0429 8.04289L11 13.0858L8.20711 10.2929L6.79289 11.7071L11 15.9142L17.4571 9.45711Z"
          ></path></svg
        >
      </button>
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

<style>
  @import "../styles/todo-element.css";
</style>
