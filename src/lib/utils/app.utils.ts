import { quickFormState } from '$lib/stores/app.store';

export function openDefaultQuickForm() {
	quickFormState.set({
		isOpen: true,
		editMode: false,
		todoID: '',
		date: null
	});
}
