<script lang="ts">
	import { getDayNames, getCurrentTime } from '$lib/utils/date';

	let time = getCurrentTime();
</script>

<div class="datepicker">
	<header>
		<button class="previous-button">prev</button>
		<div class="current-date">
			<p>{time.month} {time.year}</p>
		</div>
		<button class="next-button">next</button>
	</header>
	<div class="main-picker">
		<div class="days">
			{#each getDayNames('en-US', 'short') as day}
				<div class="day">{day}</div>
			{/each}
		</div>
		<div class="dates">
			<button class="date" disabled>1</button>
			<button class="date" disabled>2</button>
			<button class="date" disabled>3</button>
			<button class="date" disabled>4</button>
			<button class="date" disabled>5</button>
			<button class="date" disabled>6</button>
			<button class="date" disabled>7</button>
			<button class="date" disabled>8</button>
			<button class="date" disabled>9</button>
			<button class="date" disabled>10</button>
			<button class="date" disabled>11</button>
			<button class="date" disabled>12</button>
			<button class="date" disabled>13</button>
			<button class="date" disabled>14</button>
			<button class="date" disabled>15</button>
			<button class="date" disabled>16</button>
			<button class="date" disabled>17</button>
			<button class="date" disabled>18</button>
			<button class="date" disabled>19</button>
			<button class="date" disabled>20</button>
			<button class="date today">21</button>
			<button class="date">22</button>
			<button class="date selected">23</button>
			<button class="date">24</button>
			<button class="date">25</button>
			<button class="date">26</button>
			<button class="date">27</button>
			<button class="date">28</button>
			<button class="date">29</button>
			<button class="date">30</button>
		</div>
	</div>
	<footer>
		<button class="cancel-button">Cancel</button>
		<button class="select-button">Select</button>
	</footer>
</div>

<style>
	.datepicker {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		background-color: #fff;
		padding: var(--padding-2);
		border: 1px solid #aaa;
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
