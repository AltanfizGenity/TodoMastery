<script lang="ts">
	import { tagStyles, type TagColor } from '$lib/data/app-default';

	interface Props {
		classname?: string;
		text: string;
		tagColor?: TagColor;
	}

	let { classname, text, tagColor }: Props = $props();
</script>

<p class={`tag text-[.75rem] rounded-xl px-2 ${tagColor ? tagStyles[tagColor] : ''} ${classname}`}>
	{text}
</p>
