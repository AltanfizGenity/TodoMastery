<script lang="ts">
	import { createFulldateID, getDayNames, getMonthNames } from '$lib/utils/date';

	let { children, isOpen = true, onClose }: DatepickerProps = $props();
	let selectedDate = $state<Date>(new Date());
	let currentDatespace = $derived.by(() => renderDate());
	let selectedID = $state<string>('');

	function renderDate() {
		let dateRenders: DateRender[] = [];

		let month = selectedDate.getMonth();
		let year = selectedDate.getFullYear();

		let lastPreviousMonth = new Date(year, month, 0);
		let lastMonth = new Date(year, month + 1, 0);
		let firstNextMonth = new Date(year, month + 1, 1);

		let today = new Date();
		let isToday = (fullDate: Date) =>
			fullDate.getDate() == today.getDate() &&
			fullDate.getMonth() == today.getMonth() &&
			fullDate.getFullYear() == today.getFullYear();

		let totalPreviousDay = lastPreviousMonth.getDay() + 1;
		if (totalPreviousDay < 7) {
			for (let x = 1; x <= totalPreviousDay; x++) {
				let fullDate = new Date(
					year,
					month - 1,
					lastPreviousMonth.getDate() - totalPreviousDay + x
				);

				dateRenders.push({
					fullDate,
					isToday: isToday(fullDate),
					isDisabled: true
				});
			}
		}

		for (let x = 1; x <= lastMonth.getDate(); x++) {
			let fullDate = new Date(year, month, x);

			dateRenders.push({
				fullDate,
				isToday: isToday(fullDate),
				isDisabled: false
			});
		}

		let totalMissingNextDays = firstNextMonth.getDay();
		if (totalMissingNextDays > 0) {
			for (let x = firstNextMonth.getDay(); x < 7; x++) {
				let fullDate = new Date(
					year,
					month + 1,
					firstNextMonth.getDate() - firstNextMonth.getDay() + x
				);
				dateRenders.push({
					fullDate,
					isToday: isToday(fullDate),
					isDisabled: true
				});
			}
		}

		return dateRenders;
	}

	function closeDatepicker() {
		onClose();
		selectedID = '';
	}

	function goNextMonth(): void {
		// selectedDate.setMonth(selectedDate.getMonth() + 1);
		// selectedDate = new Date(selectedDate);

		selectedDate = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth() + 1,
			selectedDate.getDate()
		);
	}

	function goPreviousMonth(): void {
		selectedDate = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth() - 1,
			selectedDate.getDate()
		);
	}
</script>

<div class="datepicker-container">
	{@render children()}
	<div class={`datepicker ${isOpen ? '' : 'hidden'}`}>
		<header>
			<button class="previous-button" onclick={goPreviousMonth}>prev</button>
			<div class="current-date">
				<p>{getMonthNames()[selectedDate.getMonth()]} {selectedDate.getFullYear()}</p>
			</div>
			<button class="next-button" onclick={goNextMonth}>next</button>
		</header>
		<div class="main-picker">
			<div class="days">
				{#each getDayNames('en-US', 'short') as day}
					<div class="day">{day}</div>
				{/each}
			</div>
			<div class="dates">
				{#each currentDatespace as { fullDate, isDisabled, isToday }}
					<button
						disabled={isDisabled}
						class={`date ${isToday ? 'today' : ''} ${selectedID == createFulldateID(fullDate) ? 'selected' : ''}`}
						onclick={() => {
							selectedDate = fullDate;
							selectedID = createFulldateID(fullDate);
						}}>{fullDate.getDate()}</button
					>
				{/each}
			</div>
		</div>
		<footer>
			<button onclick={closeDatepicker} class="cancel-button">Cancel</button>
			<button class="select-button">Select</button>
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
