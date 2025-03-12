<script lang="ts">
  import QuickAddButton from "./lib/QuickAddButton.svelte";
  import { quickFormState } from "./stores/app.store";
  import TodoListView from "./lib/TodoListView.svelte";
  import QuickForm from "./lib/QuickForm.svelte";
  import CompletedTodoListView from "./lib/CompletedTodoListView.svelte";
</script>

<div id="todoist-app" class="p-12 min-h-dvh w-full h-full">
  <main id="list-main-view" class="w-[80%] flex flex-col items-start gap-6">
    <TodoListView />
    {#if $quickFormState.isOpen && !$quickFormState.editMode}
      <QuickForm />
    {:else}
      <QuickAddButton />
    {/if}
    <CompletedTodoListView />
  </main>
</div>
