<script lang="ts">
	import Overlay from '../Overlay.svelte';
	import { buildCalendarDays } from '$lib/utils/date';
	import type { CalendarDay } from '$lib/types/date';
	import { DateTime } from 'luxon';
	import IconButton from '../buttons/IconButton.svelte';
	import {
		ArrowLeftSLine,
		ArrowRightSLine,
		CalendarCloseLine,
		CalendarLine,
		RepeatLine
	} from '../icons/line';
	import BaseButton from '../buttons/BaseButton.svelte';

	interface DatepickerProps {
		dateValue: DateTime | null;
		disablePastDates?: boolean;
	}

	let { disablePastDates = true, dateValue = null }: DatepickerProps = $props();

	let currentDate = $state(DateTime.local());
	let selectedDate = $state<DateTime | null>(dateValue);
	let today = $state(DateTime.local());

	let calendarDate = $derived.by<CalendarDay[]>(() => buildCalendarDays(currentDate));
	let canGoPreviousMonth = $derived.by<boolean>(
		() => disablePastDates && currentDate.diff(today, 'month').months <= 0
	);

	$inspect(selectedDate);

	let placeholders = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
	let shortcutsData = [
		{
			name: 'today',
			dateValue: today
		},
		{
			name: 'tomorrow',
			dateValue: today.plus({ day: 1 })
		},
		{
			name: 'this weekend',
			dateValue: today.set({ weekday: 6 })
		},
		{
			name: 'next week',
			dateValue: today.plus({ week: 1 })
		},
		{
			name: 'end of month',
			dateValue: today.set({ day: today.daysInMonth })
		}
	];
	let optionsData = [
		{
			name: 'no date',
			Icon: CalendarCloseLine,
			callback: () => {
				selectedDate = null;
			}
		},
		{
			name: 'repeat',
			Icon: RepeatLine,
			callback: () => {
				console.log('repeat');
			}
		}
	];

	function goPreviousMonth() {
		currentDate = currentDate.minus({ month: 1 });
	}
	function goNextMonth() {
		currentDate = currentDate.plus({ month: 1 });
	}

	function handleShortcut(dateValue: DateTime) {
		selectedDate = dateValue;
		currentDate = dateValue;
	}
</script>

<Overlay isOpen={true} onClosed={() => {}}>
	<div class="datepicker flex bg-white flex-col gap-4 w-auto min-w-1/2 h-auto p-6">
		<div class="picker-container flex gap-24">
			<div class="shortcut flex flex-col gap-6">
				{#each shortcutsData as shortcut}
					{@const selected = selectedDate?.hasSame(shortcut.dateValue, 'day')}
					<button
						class={`text-left first-letter:capitalize hover:text-amber-400 cursor-pointer ${selected && 'text-amber-500'}`}
						onclick={() => handleShortcut(shortcut.dateValue)}
					>
						{shortcut.name}
					</button>
				{/each}
			</div>
			<div class="picker flex flex-col gap-4 items-center">
				<header class="flex justify-between w-5/6">
					<IconButton
						Icon={ArrowLeftSLine}
						onclick={goPreviousMonth}
						class={`${canGoPreviousMonth && 'opacity-20 pointer-events-none'}`}
					/>
					<button class={`month-input flex justify-center items-center group`}>
						<div class="month">{currentDate.monthLong}</div>
					</button>
					<button class="year-input flex justify-center items-center group">
						<div class="month">{currentDate.year}</div>
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
						{@const isSelected = selectedDate?.hasSame(date.time, 'day')}
						{@const isToday = date.isToday}
						{@const isDisabled =
							date.isDisabled || (disablePastDates && date.time.diff(today).milliseconds < 0)}
						<button
							type="button"
							disabled={isDisabled}
							onclick={() => (selectedDate = date.time)}
							class={`day-input w-8 h-8 cursor-pointer rounded-full border-none disabled:pointer-events-none disabled:opacity-25 disabled:select-none hover:text-amber-400 ${isToday && !isSelected ? 'bg-amber-100 text-amber-400' : ''} ${isSelected ? 'selected bg-amber-400 text-white hover:text-white' : ''}`}
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
				{#if selectedDate}
					<div class="icon w-6 text-amber-400">
						<CalendarLine />
					</div>
					<p>{selectedDate.toLocaleString(DateTime.DATE_FULL)}</p>
				{/if}
			</div>
			<div class="cta flex gap-4">
				<BaseButton text="cancel" variant="secondary" />
				<BaseButton text="confirm" variant="primary" />
			</div>
		</div>
	</div>
</Overlay>
