import type { DateTime } from 'luxon';

type DateStringFormat = 'long' | 'short' | 'narrow';

type CalendarDay = {
	time: DateTime;
	isToday: boolean;
	isDisabled: boolean;
};
