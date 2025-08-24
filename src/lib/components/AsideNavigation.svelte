<script lang="ts">
	import { page } from '$app/state';
	import { asideNavigationData } from '$lib/data/aside-navigation';
	import { isTodoFormOpen } from '$lib/store/appstate';
	import AddCircleSolid from './icons/solid/AddCircleSolid.svelte';
	function handleNewTodo() {
		isTodoFormOpen.set(true);
	}
	let pageTitle = $derived(page.data.pageTitle);
</script>

<aside class="sidebar w-64 border-r border-1 border-amber-100 p-2 bg-amber-50/10 h-full">
	<ul class="sidebar-navigation-list w-full flex flex-col">
		<li class="flex mb-2">
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
					class={`w-full p-1.5 text-sm capitalize flex gap-2 items-center ${pageTitle === navItem.title ? 'text-amber-600 bg-amber-100/35' : 'hover:bg-gray-100'}`}
				>
					<div
						class={`icon w-4 ${pageTitle === navItem.title ? 'text-amber-500' : 'text-gray-400'}`}
					>
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
