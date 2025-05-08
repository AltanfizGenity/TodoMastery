<script>
	import { redirect } from '@sveltejs/kit';
	import { AddCircleIcon, CompletedIcon, InboxIcon, SearchIcon, TodayIcon } from '../icons';
	import Action from '../other/sidebar/Action.svelte';
	import { goto } from '$app/navigation';

	function openAddFormModal() {
		console.log('hello');
	}
</script>

<aside class="side-navigation">
	<ul class="action-list">
		<Action Icon={AddCircleIcon} text="Create task" isActive={false} />
		<Action Icon={SearchIcon} text="Search" isActive={false} />
		<Action Icon={InboxIcon} text="Inbox" isActive={true} onclick={() => goto('/app/inbox')} />
		<Action Icon={TodayIcon} text="Today" isActive={false} onclick={() => goto('/app/today')} />
		<Action
			Icon={CompletedIcon}
			text="Completed"
			isActive={false}
			onclick={() => goto('/app/completed')}
		/>
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
