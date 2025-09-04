<script lang="ts">
	import { DateTime } from 'luxon';

	interface InputProps {
		dueDate: string | null;
		onInputChange?: (newDate: string) => void;
	}

	let { dueDate = $bindable(), onInputChange }: InputProps = $props();

	const handleDateChange = (event: Event) => {
		let newDate = (event.target as HTMLInputElement).value;
		onInputChange?.(newDate);
	};
</script>

<input
	type="date"
	bind:value={dueDate}
	min={DateTime.now().toISODate()}
	oninput={handleDateChange}
/>
