<script lang="ts">
	let todoTitle = $state('');

	function handleSubmit() {
		todoTitle && alert('new todo: ' + todoTitle);
	}
</script>

<div class="todo-container">
	<h1>Todos</h1>
	<div class="todo-list"></div>
	<form class="todo-form" onsubmit={handleSubmit}>
		<input type="text" placeholder="Add a todo" bind:value={todoTitle} />
		<button type="submit">create new todo</button>
	</form>
</div>
