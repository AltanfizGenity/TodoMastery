export function getDayNames(
	locale: string = 'en-US',
	format: 'long' | 'short' | 'narrow' = 'long'
): string[] {
	const dayNames: string[] = [];
	const date = new Date(2023, 0, 1);
	const options: Intl.DateTimeFormatOptions = { weekday: format };

	for (let x = 0; x < 7; x++) {
		dayNames.push(date.toLocaleDateString(locale, options));
		date.setDate(date.getDate() + 1);
	}

	return dayNames;
}
