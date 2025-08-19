<script lang="ts">
	import { isTodoFormOpen } from '$lib/store/appstate';

	function handleNewTodo() {
		isTodoFormOpen.set(true);
	}
</script>

<aside class="sidebar w-56 border-r border-1 border-amber-100 p-4 bg-amber-50/10 h-full">
	<ul class="sidebar-navigation-list w-full flex flex-col">
		<li class="flex">
			<button
				class="w-full hover:bg-gray-100 p-1 text-sm capitalize text-left cursor-pointer"
				onclick={handleNewTodo}>new todo</button
			>
		</li>
		<li class="flex">
			<a href="/app/todos" class="w-full hover:bg-gray-100 p-1 text-sm capitalize">todos</a>
		</li>
	</ul>
</aside>
