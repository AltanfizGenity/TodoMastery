<script lang="ts">
  import QuickAddButton from "./lib/QuickAddButton.svelte";
  import { quickFormState } from "./stores/app.store";
  import TodoListView from "./lib/TodoListView.svelte";
  import QuickForm from "./lib/QuickForm.svelte";
  import CompletedTodoListView from "./lib/CompletedTodoListView.svelte";
</script>

<div class="todo-mastery">
  <main class="list-main-view">
    <TodoListView />
    {#if $quickFormState.isOpen && !$quickFormState.editMode}
      <QuickForm />
    {:else}
      <QuickAddButton />
    {/if}
    <CompletedTodoListView />
  </main>
</div>

<style>
  .todo-mastery {
    width: var(--full);
    height: var(--full);
    min-height: 100dvh;
    padding: var(--padding-20);
  }

  .list-main-view {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--spacing-8);
  }
</style>
