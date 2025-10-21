<script lang="ts">
	import Overlay from '../Overlay.svelte';
	import { AddLine, SearchLine } from '../icons/line';
	import BaseButton from '../buttons/BaseButton.svelte';
	import { categories } from '$lib/store/userdata';

	$effect(() => {});

	function handleCancel() {}

	function handleConfirm() {}
</script>

<Overlay isOpen={true}>
	<div class="category=picker flex bg-white flex-col gap-8 w-auto h-auto p-8 min-w-2/5">
		<h2 class="font-bold text-xl">Select Categories</h2>
		<form
			class="search py-2 px-4 rounded-full flex gap-2 items-center w-full shadow-md has-[input:focus]:[&]:shadow-lg group has-[input:focus]:[&_.icon]:text-amber-500 group"
		>
			<div
				class="icon w-4 text-gray-500 has-[input:focus]:text-amber-500 group-hover:text-amber-500"
			>
				<SearchLine />
			</div>
			<input
				type="text"
				name="search"
				id="search"
				placeholder="Search"
				class="w-full outline-none input"
			/>
		</form>
		<div class="picker-container flex flex-col">
			{#each $categories as category}
				<button type="button" class={`capitalize text-left p-2 hover:bg-gray-50 cursor-pointer`}
					>{category.name}</button
				>
			{/each}
			<button
				type="button"
				class="capitalize flex gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer"
			>
				<div class="icon w-5 text-amber-500">
					<AddLine />
				</div>
				<p class=" text-sm">new category</p>
			</button>
		</div>
		<div class="divider w-full h-0.5 bg-gray-100 mt-4"></div>
		<div class="picker-actions flex justify-end">
			<div class="cta flex gap-4">
				<BaseButton text="cancel" variant="secondary" onClick={handleCancel} />
				<BaseButton text="confirm" variant="primary" onClick={handleConfirm} />
			</div>
		</div>
	</div>
</Overlay>
