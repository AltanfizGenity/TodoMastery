<script lang="ts">
	let { data } = $props();
</script>

<h1 class="text-2xl font-bold">Profile page</h1>
<div class="profile">
	<h2 class="capitalize">{data.user?.name}</h2>
</div>
