<script lang="ts">
	import { DateTime } from 'luxon';
	import Datepicker from './Datepicker.svelte';
	import { CalendarLine } from '../icons/line';
	import { onMount } from 'svelte';

	interface InputProps {
		ondatechange: (newDate: DateTime | null) => void;
		initialValue?: DateTime | null;
	}

	let { ondatechange, initialValue }: InputProps = $props();

	let isDatepickerOpen = $state(false);
	let dateinput = $state<DateTime | null>(null);
	let label = $derived.by(() => {
		if (!dateinput) {
			return 'No date';
		}

		return dateinput.toLocaleString(DateTime.DATE_MED);
	});

	onMount(() => {
		if (initialValue !== undefined) {
			dateinput = initialValue;
		}
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

<div class="duedate-input">
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
		title="Select Due Date"
	/>
</div>
