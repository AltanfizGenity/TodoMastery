<script lang="ts">
	import '$lib/style/normalize.css';
	import '$lib/style/app.css';

	let { children } = $props();
</script>

<div class="main-layout">
	{@render children()}
</div>
