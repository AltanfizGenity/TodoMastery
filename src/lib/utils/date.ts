import type { CalendarDay } from '$lib/types/date';
import { DateTime } from 'luxon';
let now = DateTime.local();

export function buildCalendarDays(date: DateTime = now) {
	let dateRenders: CalendarDay[] = [];

	let month = date.month;
	let year = date.year;

	let lastPreviousMonth = date.set({ day: 0, hour: 0 });
	let firstNextMonth = date.set({ month: month + 1, day: 1, hour: 0 });

	let totalPreviousDay = lastPreviousMonth.weekday + 1;

	if (totalPreviousDay < 7) {
		for (let x = 1; x <= totalPreviousDay; x++) {
			let time = date.set({
				year,
				month: lastPreviousMonth.month,
				day: lastPreviousMonth.day - totalPreviousDay + x
			});

			dateRenders.push({
				time,
				isToday: isToday(time),
				isDisabled: true
			});
		}
	}

	for (let x = 1; x <= date.daysInMonth!; x++) {
		let time = date.set({ day: x });
		dateRenders.push({
			time,
			isToday: isToday(time),
			isDisabled: false
		});
	}

	let totalMissingDaysOfNextMonth = firstNextMonth.weekday;

	if (totalMissingDaysOfNextMonth > 0) {
		for (let x = totalMissingDaysOfNextMonth; x < 7; x++) {
			let time = date.set({
				year,
				month: month + 1,
				day: firstNextMonth.day - totalMissingDaysOfNextMonth + x
			});
			dateRenders.push({
				time,
				isToday: isToday(time),
				isDisabled: true
			});
		}
	}

	return dateRenders;
}

export function isToday(time: DateTime) {
	return time.hasSame(now, 'day');
}

function getMonthNames(format: 'long' | 'short' | 'narrow' = 'long'): string[] {
	const monthNames: string[] = [];
	let time = DateTime.local(2023, 1, 1);

	for (let x = 0; x < 12; x++) {
		monthNames.push(time.toLocaleString({ month: format }));
		time = time.set({ month: time.month + 1 });
	}

	return monthNames;
}

// export function
export function hasTimePassed(date: DateTime): boolean {
	return date.diff(now).milliseconds < 0;
}

export function isDateInCurrentWeek(date: DateTime): boolean {
	return date.weekNumber === now.weekNumber && date.year === now.year;
}

export function formatTime(time: DateTime): string {
	let isOnSameYear: boolean = time.hasSame(now, 'year');
	let isTimeOnSameMonth: boolean = time.hasSame(now, 'month');
	let isToday: boolean = isTimeOnSameMonth && time.hasSame(now, 'day');
	let isTomorrow: boolean = isTimeOnSameMonth && time.day - now.day == 1;

	if (isToday) {
		return 'Today';
	}

	if (isTomorrow) {
		return 'Tomorrow';
	}

	if (isDateInCurrentWeek(time) && !hasTimePassed(time)) {
		return time.toLocaleString({ weekday: 'long' });
	}

	return `${time.day} ${getMonthNames()[time.month - 1]} ${isOnSameYear ? '' : time.year}`;
}
