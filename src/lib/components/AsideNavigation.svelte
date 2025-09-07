<script lang="ts">
	import { page } from '$app/state';
	import { customizationAsideNav, mainAsideNav } from '$lib/data/aside-navigation';
	import type { AsideNavigation } from '$lib/data/aside-navigation';
	import { isTodoFormOpen } from '$lib/store/appstate';
	import AsideNavigationRegion from './AsideNavigationRegion.svelte';
	import AddCircleSolid from './icons/solid/AddCircleSolid.svelte';
	function handleNewTodo() {
		isTodoFormOpen.set(true);
	}
	let pageTitle = $derived(page.data.pageTitle);
</script>

{#snippet NavList(navigationData: AsideNavigation[])}
	{#each navigationData as navItem}
		{@const Icon = navItem.Icon}
		<ul class="sidebar-navigation-list w-full flex flex-col">
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
		</ul>
	{/each}
{/snippet}

<aside class="sidebar w-64 border-r border-1 border-amber-100 p-3 bg-amber-50/10 h-full">
	<div class="items-list flex flex-col gap-4 items-center">
		<AsideNavigationRegion>
			<button
				class="w-full hover:bg-gray-100 p-2 text-sm capitalize flex gap-2 items-center cursor-pointer"
				onclick={handleNewTodo}
			>
				<div class="icon w-4 text-amber-500 scale-150">
					<AddCircleSolid />
				</div>
				<p class="title">New Todo</p>
			</button>
		</AsideNavigationRegion>
		<AsideNavigationRegion title="todo list">
			{@render NavList(mainAsideNav)}
		</AsideNavigationRegion>
		<AsideNavigationRegion title="customization">
			{@render NavList(customizationAsideNav)}
		</AsideNavigationRegion>
	</div>
</aside>
