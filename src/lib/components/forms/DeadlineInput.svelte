<script lang="ts">
	import { DateTime } from 'luxon';
	import Datepicker from './Datepicker.svelte';
	import { CalendarLine } from '../icons/line';

	interface InputProps {
		ondatechange: (newDate: DateTime | null) => void;
	}

	let { ondatechange }: InputProps = $props();

	let isDatepickerOpen = $state(false);
	let dateinput = $state<DateTime | null>(null);
	let label = $derived.by(() => {
		if (!dateinput) {
			return 'No date';
		}

		return dateinput.toLocaleString(DateTime.DATE_MED);
	});

	function handleclick() {
		isDatepickerOpen = true;
	}

	function closepicker() {
		isDatepickerOpen = false;
	}

	function handleDateChange(newDate: DateTime | null) {
		dateinput = newDate;
		ondatechange(newDate);
		closepicker();
	}
</script>

<div class="deadline-input">
	<button
		type="button"
		class="flex items-center gap-2 px-2 py-1 rounded-xl outline-gray-400 outline-1 cursor-pointer text-gray-600 hover:outline-gray-600 hover:text-gray-800"
		onclick={handleclick}
	>
		<div class="icon w-4">
			<CalendarLine />
		</div>
		<p>{label}</p>
	</button>
	<Datepicker
		bind:dateValue={dateinput}
		isOpen={isDatepickerOpen}
		oncancel={closepicker}
		onconfirm={handleDateChange}
		disablePastDates
	/>
</div>
