<script lang="ts">
  import QuickAddForm from "./lib/QuickAddForm.svelte";
  import QuickAddButton from "./lib/QuickAddButton.svelte";
  import { isQuickFormOpen } from "./stores/app.store";
  import TodoListView from "./lib/TodoListView.svelte";
</script>

<div id="todoist-app" class="p-12 min-h-dvh w-full h-full">
  <main id="list-main-view" class="w-[80%] flex flex-col items-start gap-6">
    <TodoListView />
    {#if $isQuickFormOpen}
      <QuickAddForm />
    {:else}
      <QuickAddButton />
    {/if}
  </main>
</div>
