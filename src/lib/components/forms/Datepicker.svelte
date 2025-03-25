<script lang="ts">
	import { isToday, getDayNames, getMonthNames } from '$lib/utils/date';
	import { DateTime } from 'luxon';

	let { children, isOpen = true, onClose, dateValue = $bindable() }: DatepickerProps = $props();
	let currentDate = $state<LuxonTime>(DateTime.local());
	let currentDatespace = $derived.by(() => renderDate());
	let selectedDate = $state<LuxonTime | null>(null);

	$effect(() => {
		if (isOpen) {
			selectedDate = dateValue ? dateValue : null;
		}
	});

	function renderDate() {
		let dateRenders: DatepickerDayData[] = [];

		let month = currentDate.month;
		let year = currentDate.year;

		let lastPreviousMonth = currentDate.set({ day: 0, hour: 0 });
		let firstNextMonth = currentDate.set({ month: month + 1, day: 1, hour: 0 });

		let totalPreviousDay = lastPreviousMonth.weekday + 1;

		if (totalPreviousDay < 7) {
			for (let x = 1; x <= totalPreviousDay; x++) {
				let time = currentDate.set({
					year,
					month: lastPreviousMonth.month,
					day: lastPreviousMonth.day - totalPreviousDay + x
				});

				dateRenders.push({
					time,
					isToday: isToday(time),
					isDisabled: true
				});
			}
		}

		for (let x = 1; x <= currentDate.daysInMonth!; x++) {
			let time = currentDate.set({ day: x });
			dateRenders.push({
				time,
				isToday: isToday(time),
				isDisabled: false
			});
		}

		let totalMissingDaysOfNextMonth = firstNextMonth.weekday;

		if (totalMissingDaysOfNextMonth > 0) {
			for (let x = totalMissingDaysOfNextMonth; x < 7; x++) {
				let time = currentDate.set({
					year,
					month: month + 1,
					day: firstNextMonth.day - totalMissingDaysOfNextMonth + x
				});
				dateRenders.push({
					time,
					isToday: isToday(time),
					isDisabled: true
				});
			}
		}

		return dateRenders;
	}

	function closeDatepicker() {
		onClose();
		selectedDate = null;
	}

	function goNextMonth(): void {
		currentDate = currentDate.plus({ month: 1 });
	}

	function goPreviousMonth(): void {
		currentDate = currentDate.minus({ month: 1 });
	}

	function selectDate(): void {
		dateValue = selectedDate;
		closeDatepicker();
	}
</script>

<div class="datepicker-container">
	{@render children()}
	<div class={`datepicker ${isOpen ? '' : 'hidden'}`}>
		<header>
			<button class="previous-button" onclick={goPreviousMonth}>prev</button>
			<div class="current-date">
				<p>{getMonthNames()[currentDate.month - 1]} {currentDate.year}</p>
			</div>
			<button class="next-button" onclick={goNextMonth}>next</button>
		</header>
		<div class="main-picker">
			<div class="days">
				{#each getDayNames('short') as day}
					<div class="day">{day}</div>
				{/each}
			</div>
			<div class="dates">
				{#each currentDatespace as { time, isDisabled, isToday }}
					<button
						disabled={isDisabled}
						class={`date ${isToday ? 'today' : ''} ${selectedDate ? (selectedDate.toLocaleString() == time.toLocaleString() ? 'selected' : '') : ''}`}
						onclick={() => {
							selectedDate = time;
						}}>{time.day}</button
					>
				{/each}
			</div>
		</div>
		<footer>
			<button onclick={closeDatepicker} class="cancel-button">Cancel</button>
			<button class="select-button" onclick={selectDate} disabled={selectedDate == null}
				>Select</button
			>
		</footer>
	</div>
</div>

<style>
	.datepicker-container {
		position: relative;
	}

	.datepicker {
		position: absolute;
		top: 110%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		background-color: #fff;
		padding: var(--padding-2);
		border: 1px solid #aaa;
		border-radius: var(--radius-lg);

		&.hidden {
			display: none;
		}
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: var(--padding-4);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		button {
			text-transform: uppercase;
			color: var(--color-text);
		}
	}

	.main-picker {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.days,
	.dates {
		display: grid;
		grid-template-columns: repeat(7, var(--text-4xl));
		gap: var(--spacing-2);
	}

	.day {
		text-align: center;
		font-weight: bold;
		text-transform: uppercase;
	}

	.date {
		padding: var(--padding-2);
		border-radius: var(--radius-lg);
		aspect-ratio: 1;
		background-color: transparent;
		border: none;

		&:disabled {
			pointer-events: none;
			user-select: none;
			opacity: 0.5;
		}

		&:hover {
			background-color: var(--color-background);
		}

		&.today {
			background-color: rgba(216, 65, 65, 0.1);
			color: var(--color-primary);
		}

		&.selected {
			background-color: var(--color-primary);
			color: var(--color-background);
		}
	}

	footer {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-4);
		padding-block: var(--padding-4);
		border-top: 1px solid rgba(0, 0, 0, 0.1);

		button {
			padding: var(--padding-2) var(--padding-4);
			border-radius: var(--radius-md);
		}

		.cancel-button {
			background-color: #eee;
		}

		.select-button {
			background-color: var(--color-primary);
			color: var(--color-background);
		}
	}
</style>
