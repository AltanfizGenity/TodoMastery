<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	type Variant = 'info' | 'success' | 'warning' | 'error';

	interface Props {
		onclose: () => void;
		variant: Variant;
		title?: string;
		dismissible?: boolean;
		timeout?: number;
		open: boolean;
	}

	let { onclose, variant, title, dismissible = false, timeout = 5000, open }: Props = $props();
	let timeoutId = $state<ReturnType<typeof setTimeout> | null>(null);

	onMount(() => {
		if (timeout && open) timeoutId = setTimeout(() => close(), timeout);
	});

	$effect(() => {
		if (timeoutId && !open) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	});

	const variantClasses = {
		info: 'bg-indigo-50 border-indigo-200 text-indigo-900',
		success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
		warning: 'bg-amber-50 border-amber-200 text-amber-900',
		error: 'bg-rose-50 border-rose-200 text-rose-900'
	};

	const iconMap = {
		info: 'ℹ',
		success: '✔',
		warning: '⚠',
		error: '✖'
	};

	function close() {
		open = false;
		onclose();
	}
</script>

{#if open}
	<article
		class="flex items-start gap-3 border rounded-xl px-4 py-3 shadow-sm w-full max-w-lg focus:outline-none transition-opacity duration-200 {variantClasses[
			variant
		]}"
		role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
		aria-live={variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'}
		tabindex="0"
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 150 }}
	>
		<div class="text-xl select-none" aria-hidden="true">{iconMap[variant]}</div>

		<div class="flex-1">
			{#if title}
				<div class="font-semibold mb-0.5">{title}</div>
			{/if}
			<div class="leading-snug text-sm"><slot /></div>
		</div>

		{#if dismissible}
			<button
				class="ml-2 text-xl font-bold leading-none hover:opacity-80 transition-opacity"
				onclick={close}
				aria-label="Dismiss">×</button
			>
		{/if}
	</article>
{/if}
