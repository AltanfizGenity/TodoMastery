import { writable } from 'svelte/store';

export let isTodoFormOpen = writable(false);
export let isCreatingCategory = writable(false);
export let isTodoPropertyOpen = writable(false);
export let todoPropertyId = writable<number | null>(null);
