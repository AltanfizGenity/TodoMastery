import { CompleteLine, TodoLine } from '$lib/components/icons/line';
import { AddCircleSolid } from '$lib/components/icons/solid';

export type AsideNavigation = {
	title: string;
	href: string;
	Icon: SvelteComponent;
};

export let asideNavigationData: AsideNavigation[] = [
	{
		title: 'todos',
		href: '/app/todos',
		Icon: TodoLine
	},
	{
		title: 'completed',
		href: '/app/completed',
		Icon: CompleteLine
	}
];
