<script lang="ts">
  import QuickAddForm from "./lib/QuickAddForm.svelte";
  import QuickAddButton from "./lib/QuickAddButton.svelte";
  import { isQuickFormOpen } from "./stores/app.store";
  import TodoListView from "./lib/TodoListView.svelte";
</script>

<main id="todoist-app">
  <TodoListView />
  {#if $isQuickFormOpen}
    <QuickAddForm />
  {:else}
    <QuickAddButton />
  {/if}
</main>
