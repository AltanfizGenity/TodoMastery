<script>
	import { AddCircleIcon, CompletedIcon, InboxIcon, SearchIcon, TodayIcon } from '../icons';
	import Action from '../other/sidebar/Action.svelte';
	import { currentAppPage } from '$lib/stores/app.store';
	import { sidebarActions } from '$lib/data/app/sidebar';
</script>

<aside class="side-navigation">
	<ul class="action-list">
		{#each sidebarActions as { Icon, name, text, clickHandler }}
			<Action
				{...{ Icon, text }}
				isActive={$currentAppPage == name ? true : false}
				onclick={clickHandler}
			/>
		{/each}
	</ul>
</aside>

<style>
	.side-navigation {
		width: 22rem;
		border-right: 1px solid #eee;
		padding: var(--padding-4);
	}

	.action-list {
		display: flex;
		flex-direction: column;
	}
</style>
