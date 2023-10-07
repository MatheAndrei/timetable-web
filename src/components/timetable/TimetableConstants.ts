import {DateTime, Interval} from "luxon";

export enum Week {
	MONDAY = "Monday",
	TUESDAY = "Tuesday",
	WEDNESDAY = "Wednesday",
	THURSDAY = "Thursday",
	FRIDAY = "Friday",
	SATURDAY = "Saturday",
	SUNDAY = "Sunday"
}

export const weekDays: string[] = [Week.MONDAY, Week.TUESDAY, Week.WEDNESDAY, Week.THURSDAY, Week.FRIDAY, Week.SATURDAY, Week.SUNDAY];
export const dayStart: DateTime = DateTime.fromISO("08:00");
export const dayEnd: DateTime = DateTime.fromISO("20:00");
export const dayHours: DateTime[] = Array.from(
	{length: Interval.fromDateTimes(dayStart, dayEnd).length("hours")},
	(_, idx) => dayStart.plus({hour: idx})
);

// STYLES
export const headerBGColor: string = "#001427";
export const headerFGColor: string = "#fff";
export const bodyBGColor: string = "#f5f2f0"
export const bodyFGColor: string = "#001427"
export const lectureColor: string = "#bf0603";
export const seminarColor: string = "#708d81";
export const labColor: string = "#f4d58d";
export const slotColor: string = "#e8e5e3"

export const cellMargin: string = "1px";
export const cellPadding: string = ".5em";
export const dayCellSize: string = "10em";
export const hourCellSize: string = "14em";
export const eventCellSize: string = "100%";
