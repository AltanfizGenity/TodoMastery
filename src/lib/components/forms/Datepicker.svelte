<script lang="ts">
	import { getDayNames, getMonthNames } from '$lib/utils/date';
	import { onMount } from 'svelte';

	let { children, isOpen = true, closePicker }: DatepickerProps = $props();
	let selectedTime = $state<Date>(new Date());
	let now = new Date();
	let currentDatespace = $derived.by(() => renderDate());

	function selectTime() {}

	function isToday(date: number): boolean {
		return (
			now.getDate() == date &&
			now.getMonth() == selectedTime.getMonth() &&
			now.getFullYear() == selectedTime.getFullYear()
		);
	}

	function renderDate() {
		let dateRenders: DateRender[] = [];

		let month = selectedTime.getMonth();
		let year = selectedTime.getFullYear();
		let lastPreviousMonth = new Date(year, month, 0);
		let lastMonth = new Date(year, month + 1, 0);
		let firstNextMonth = new Date(year, month + 1, 1);

		for (let x = 0; x <= lastPreviousMonth.getDay(); x++) {
			let date = lastPreviousMonth.getDate() - lastPreviousMonth.getDay() + x;
			let currentRenderDate = new Date(year, month - 1, date);
			dateRenders.push({
				date: currentRenderDate.getDate(),
				isToday: isToday(date),
				isDisabled: true
			});
		}

		for (let x = 1; x <= lastMonth.getDate(); x++) {
			dateRenders.push({
				date: x,
				isToday: isToday(x),
				isDisabled: false
			});
		}

		for (let x = firstNextMonth.getDay(); x < 7; x++) {
			let date = firstNextMonth.getDate() - firstNextMonth.getDay() + x;
			dateRenders.push({
				date,
				isToday: isToday(date),
				isDisabled: true
			});
		}

		return dateRenders;
	}
</script>

<div class="datepicker-container">
	{@render children()}
	<div class={`datepicker ${isOpen ? '' : 'hidden'}`}>
		<header>
			<button class="previous-button">prev</button>
			<div class="current-date">
				<p>{getMonthNames()[selectedTime.getMonth()]} {selectedTime.getFullYear()}</p>
			</div>
			<button
				class="next-button"
				onclick={() => {
					selectedTime.setMonth(selectedTime.getMonth() + 1);
					selectedTime = new Date(selectedTime);
				}}>next</button
			>
		</header>
		<div class="main-picker">
			<div class="days">
				{#each getDayNames('en-US', 'short') as day}
					<div class="day">{day}</div>
				{/each}
			</div>
			<div class="dates">
				{#each currentDatespace as { date, isDisabled, isToday }}
					<button disabled={isDisabled} class={`date ${isToday ? 'today' : ''}`}>{date}</button>
				{/each}
			</div>
		</div>
		<footer>
			<button onclick={closePicker} class="cancel-button">Cancel</button>
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
