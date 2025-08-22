<script lang="ts">
	import { asideNavigationData } from '$lib/data/aside-navigation';
	import { isTodoFormOpen } from '$lib/store/appstate';
	import AddCircleSolid from './icons/solid/AddCircleSolid.svelte';

	function handleNewTodo() {
		isTodoFormOpen.set(true);
	}
</script>

<aside class="sidebar w-56 border-r border-1 border-amber-100 p-4 bg-amber-50/10 h-full">
	<ul class="sidebar-navigation-list w-full flex flex-col">
		<li class="flex">
			<button
				class="w-full hover:bg-gray-100 p-2 text-sm capitalize flex gap-2 items-center cursor-pointer"
				onclick={handleNewTodo}
			>
				<div class="icon w-4 text-amber-500 scale-150">
					<AddCircleSolid />
				</div>
				<p class="title">New Todo</p>
			</button>
		</li>
		{#each asideNavigationData as navItem}
			{@const Icon = navItem.Icon}
			<li class="flex">
				<a
					href={navItem.href}
					class="w-full hover:bg-gray-100 p-2 text-sm capitalize flex gap-2 items-center"
				>
					<div class="icon w-4 text-gray-400">
						<Icon />
					</div>
					<p class="title">
						{navItem.title}
					</p>
				</a>
			</li>
		{/each}
	</ul>
</aside>
