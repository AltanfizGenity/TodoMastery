<script lang="ts">
	import { tagStyles, type TagColor } from '$lib/data/app-default';
	import type { Component } from 'svelte';

	interface Props {
		classname?: string;
		text: string;
		tagColor?: TagColor;
		Icon?: Component;
	}

	let { classname, text, tagColor, Icon }: Props = $props();
</script>

{#if Icon}
	<div
		class={`tag text-[.75rem] rounded-xl px-2 flex gap-1 ${tagColor ? tagStyles[tagColor] : ''} ${classname}`}
	>
		<div class="icon w-4">
			<Icon />
		</div>
		<p class="text">{text}</p>
	</div>
{:else}
	<p
		class={`tag text-[.75rem] rounded-xl px-2 ${tagColor ? tagStyles[tagColor] : ''} ${classname}`}
	>
		{text}
	</p>
{/if}
