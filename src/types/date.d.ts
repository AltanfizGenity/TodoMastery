type DateStringFormat = 'long' | 'short' | 'narrow';

type DatepickerDayData = {
	time: LuxonTime;
	isToday: boolean;
	isDisabled: boolean;
};
