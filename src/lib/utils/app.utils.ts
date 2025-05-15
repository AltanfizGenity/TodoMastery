import { quickFormState } from '$lib/stores/app.store';

export function openDefaultQuickForm(date: LuxonTime | null = null) {
	quickFormState.set({
		isOpen: true,
		editMode: false,
		todoID: '',
		date
	});
}
