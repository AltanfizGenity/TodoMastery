export function getDayNames(locale: string = 'en-US', format: DateStringFormat = 'long'): string[] {
	const dayNames: string[] = [];
	const date = new Date(2023, 0, 1);
	const options: Intl.DateTimeFormatOptions = { weekday: format };

	for (let x = 0; x < 7; x++) {
		dayNames.push(date.toLocaleDateString(locale, options));
		date.setDate(date.getDate() + 1);
	}

	return dayNames;
}

export function getMonthNames(
	locale: string = 'en-US',
	format: 'long' | 'short' | 'narrow' = 'long'
): string[] {
	const monthNames: string[] = [];
	const date = new Date(2023, 0, 1);
	const options: Intl.DateTimeFormatOptions = { month: format };

	for (let x = 0; x < 12; x++) {
		monthNames.push(date.toLocaleDateString(locale, options));
		date.setMonth(date.getMonth() + 1);
	}

	return monthNames;
}

export function getCurrentTime(locale: string = 'en-US', format: DateStringFormat = 'long') {
	let now = new Date();

	return {
		year: now.getFullYear(),
		month: getMonthNames(locale, format)[now.getMonth() + 1],
		date: now.getDate(),
		day: getDayNames(locale, format)[now.getDate()]
	};
}

export function formatTime(time: Date): string {
	const now = new Date();

	// Check if is today
	if (time.toDateString() == now.toDateString()) {
		return 'Today';
	}

	// Check if is tomorrow

	if (time.getMonth() == now.getMonth() && time.getFullYear() == now.getFullYear()) {
		if (time.getDate() - now.getDate() == 1) {
			return 'Tomorrow';
		}
		``;

		console.log(time.getDay());
	}

	// The return should day (like: Wednesday, Tuesday) in that week
	// return short format (Date-Month) if the year is same
	if (time.getFullYear() == now.getFullYear()) {
		return `${time.getDate()} ${getMonthNames()[time.getMonth()]}`;
	}

	// return basic format if year is future (Date-Month-Year)
	return `${time.getDate()} ${getMonthNames()[time.getMonth()]} ${time.getFullYear()}`;
}

export function createFulldateID(fulldate: Date): string {
	return `${fulldate.getDate() + 1}-${fulldate.getMonth() + 1}-${fulldate.getFullYear()}`;
}
