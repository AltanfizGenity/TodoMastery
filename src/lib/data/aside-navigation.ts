import { CompleteLine, TodoLine } from '$lib/components/icons/line';
import TodayLine from '$lib/components/icons/line/TodayLine.svelte';

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
		title: 'today',
		href: '/app/today',
		Icon: TodayLine
	},
	{
		title: 'completed',
		href: '/app/completed',
		Icon: CompleteLine
	}
];
