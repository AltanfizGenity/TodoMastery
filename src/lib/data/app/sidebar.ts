import { goto } from '$app/navigation';
import {
	AddCircleIcon,
	CompletedIcon,
	InboxIcon,
	SearchIcon,
	TodayIcon
} from '$lib/components/icons';

import { currentAppPage, isSearchboxOpen, isTodoFormOpen } from '$lib/stores/app.store';

interface SidebarActionData {
	name: string;
	text: string;
	Icon: SvelteComponent;
	clickHandler?: (e: MouseEvent) => void;
}

export const sidebarActions: SidebarActionData[] = [
	{
		name: 'add',
		text: 'Create task',
		Icon: AddCircleIcon,
		clickHandler: () => isTodoFormOpen.set(true)
	},
	{
		name: 'search',
		text: 'Search',
		Icon: SearchIcon,
		clickHandler: () => isSearchboxOpen.set(true)
	},
	{
		name: 'inbox',
		text: 'Inbox',
		Icon: InboxIcon,
		clickHandler: () => {
			goto('/app/inbox');
		}
	},
	{
		name: 'today',
		text: 'Today',
		Icon: TodayIcon,
		clickHandler: () => {
			goto('/app/today');
		}
	},
	{
		name: 'completed',
		text: 'Completed',
		Icon: CompletedIcon,
		clickHandler: () => {
			goto('/app/completed');
		}
	}
];
