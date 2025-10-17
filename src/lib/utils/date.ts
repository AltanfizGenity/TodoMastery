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
