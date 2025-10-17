<script lang="ts">
	import Overlay from '../Overlay.svelte';
	import { buildCalendarDays } from '$lib/utils/date';
	import type { CalendarDay } from '$lib/types/date';
	import { DateTime } from 'luxon';
	import IconButton from '../buttons/IconButton.svelte';
	import {
		ArrowDownSLine,
		ArrowLeftSLine,
		ArrowRightSLine,
		CalendarCloseLine,
		CalendarLine,
		RepeatLine
	} from '../icons/line';
	import BaseButton from '../buttons/BaseButton.svelte';

	let currentDate = $state(DateTime.local());
	let selectedDate = $state<DateTime | null>(null);

	let calendarDate = $derived.by<CalendarDay[]>(() => buildCalendarDays(currentDate));

	let placeholders = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
	let quickAccessData = ['today', 'tomorrow', 'this weekend', 'next week', 'last month'];
	let optionsData = [
		{
			name: 'no date',
			Icon: CalendarCloseLine,
			callback: () => {}
		},
		{
			name: 'repeat',
			Icon: RepeatLine,
			callback: () => {}
		}
	];

	function goPreviousMonth() {
		currentDate = currentDate.minus({ month: 1 });
	}
	function goNextMonth() {
		currentDate = currentDate.plus({ month: 1 });
	}
	function handleQuickAccess(dateValue: DateTime) {}
</script>

<Overlay isOpen={true} onClosed={() => {}}>
	<div class="datepicker flex bg-white flex-col gap-4 w-auto min-w-1/2 h-auto p-6">
		<div class="picker-container flex gap-24">
			<div class="quickaccess flex flex-col gap-6">
				<!-- CHECKPOINT: Styling quick access part -->
				{#each quickAccessData as quickAccess}
					<button
						class="text-left first-letter:capitalize hover:text-amber-400 cursor-pointer"
						onclick={() => handleQuickAccess(DateTime.now())}
					>
						{quickAccess}
					</button>
				{/each}
			</div>
			<div class="picker flex flex-col gap-4 items-center">
				<header class="flex justify-between w-5/6">
					<IconButton Icon={ArrowLeftSLine} onclick={goPreviousMonth} />
					<button class="month-input flex justify-center items-center cursor-pointer group">
						<div class="month">{currentDate.monthLong}</div>
						<div class="icon w-6 h-6 text-gray-400 group-hover:text-amber-400">
							<ArrowDownSLine />
						</div>
					</button>
					<button class="year-input flex justify-center items-center cursor-pointer group">
						<div class="month">{currentDate.year}</div>
						<div class="icon w-6 h-6 text-gray-400 group-hover:text-amber-400">
							<ArrowDownSLine />
						</div>
					</button>
					<IconButton Icon={ArrowRightSLine} onclick={goNextMonth} />
				</header>
				<div class="date-placeholder grid grid-cols-7 gap-4">
					{#each placeholders as placeholder}
						<div
							class="placeholder w-8 h-8 aspect-square flex items-center justify-center text-gray-400 pointer-events-none select-none"
						>
							{placeholder}
						</div>
					{/each}
				</div>
				<div class="date-inputfield grid grid-cols-7 gap-4 grid-rows-6">
					{#each calendarDate as date}
						{@const isSelected = selectedDate?.equals(date.time)}
						{@const isToday = date.isToday}
						{@const isDisabled = date.isDisabled}
						<button
							type="button"
							disabled={isDisabled}
							onclick={() => (selectedDate = date.time)}
							class={`day-input w-8 h-8 cursor-pointer rounded-full border-none disabled:pointer-events-none disabled:opacity-25 disabled:select-none hover:text-amber-400 ${isToday ? 'bg-amber-100 text-amber-400' : ''} ${isSelected ? 'selected bg-amber-400 text-white hover:text-white' : ''}`}
						>
							{date.time.day}
						</button>
					{/each}
				</div>
			</div>
			<div class="options flex flex-col gap-4 justify-start">
				{#each optionsData as { Icon, callback, name }}
					<IconButton {Icon} text={name} onclick={callback} />
				{/each}
			</div>
		</div>
		<div class="divider w-full h-0.5 bg-gray-100 mt-4"></div>
		<div class="picker-actions flex justify-between">
			<div class="overview flex gap-2">
				<div class="icon w-6 text-amber-400">
					<CalendarLine />
				</div>
				<p>16 October 2025</p>
			</div>
			<div class="cta flex gap-4">
				<BaseButton text="cancel" variant="secondary" />
				<BaseButton text="confirm" variant="primary" />
			</div>
		</div>
	</div>
</Overlay>
