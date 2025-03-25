import { DateTime } from 'luxon';

let now = DateTime.local();

export function isToday(time: DateTime) {
	return time.hasSame(now, 'day');
}

export function getDayNames(format: DateStringFormat = 'long'): string[] {
	const dayNames: string[] = [];
	let time = DateTime.local(2023, 1, 1);

	for (let x = 0; x < 7; x++) {
		dayNames.push(time.toLocaleString({ weekday: format }));
		time = time.set({ day: time.day + 1 });
	}

	return dayNames;
}

export function getMonthNames(format: DateStringFormat = 'long'): string[] {
	const monthNames: string[] = [];
	let time = DateTime.local(2023, 1, 1);

	for (let x = 0; x < 12; x++) {
		monthNames.push(time.toLocaleString({ month: format }));
		time = time.set({ month: time.month + 1 });
	}

	return monthNames;
}

export function formatTime(time: LuxonTime): string {
	let isTimeOnSameMonth: boolean = time.hasSame(now, 'year') && time.hasSame(now, 'month');
	let isToday: boolean = isTimeOnSameMonth && time.hasSame(now, 'day');
	let isTomorrow: boolean = isTimeOnSameMonth && time.day - now.day == 1;
	let isOnSameWeek: boolean =
		Math.ceil(time.daysInYear / time.localWeekNumber) ==
		Math.ceil(now.daysInYear / now.localWeekNumber);

	if (isToday) {
		return 'Today';
	}

	if (isTomorrow) {
		return 'Tomorrow';
	}

	if (isOnSameWeek) {
		return time.toLocaleString({ weekday: 'long' });
	}

	return `${time.day} ${getMonthNames()[time.month]} ${time.year}`;
}
