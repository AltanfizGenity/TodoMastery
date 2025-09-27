export function isValidId(id: number): boolean {
	return Number.isInteger(id) && id > 0;
}

export function validateTodoTitle(text: string): string | null {
	let validatedText = text.trim();
	return validatedText.length > 0 ? validatedText : null;
}
