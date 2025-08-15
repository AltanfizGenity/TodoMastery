<script lang="ts">
	import './app.css';
	let { children } = $props();
</script>

<div class="main-layout">
	{@render children()}
</div>
