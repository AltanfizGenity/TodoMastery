import type { DateTime } from 'luxon';
import type { Component } from 'svelte';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	type LuxonTime = DateTime;
	type SvelteComponent = Component;
	type AppPage = 'inbox' | 'today' | 'completed' | 'none';
	declare namespace App {
		interface Locals {
			user?: {
				[id: string]: any;
			};
		}
	}
}

export {};
