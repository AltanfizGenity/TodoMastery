<script lang="ts">
  import QuickAddButton from "./lib/QuickAddButton.svelte";
  import { quickFormState } from "./stores/app.store";
  import TodoListView from "./lib/TodoListView.svelte";
  import QuickForm from "./lib/QuickForm.svelte";
  import CompletedTodoListView from "./lib/CompletedTodoListView.svelte";
</script>

<div class="todo-mastery-app">
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

<style lang="scss">
  @forward "./style/todo-mastery.scss";
</style>
