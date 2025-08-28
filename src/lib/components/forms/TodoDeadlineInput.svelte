<script lang="ts">
	import { DateTime } from 'luxon';

	interface InputProps {
		dueDate: string;
	}

	let { dueDate = $bindable() }: InputProps = $props();
</script>

<input type="date" bind:value={dueDate} min={DateTime.now().toISODate()} />
