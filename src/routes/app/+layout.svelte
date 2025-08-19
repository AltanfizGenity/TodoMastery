<script lang="ts">
	let { children } = $props();
</script>

<div class="app-container flex">
	<aside class="sidebar w-56 border-r border-1 border-amber-100">
		<ul class="sidebar-navigation-list">
			<li>
				<a href="/tasks">tasks</a>
			</li>
		</ul>
	</aside>
	<main>
		{@render children()}
	</main>
</div>
