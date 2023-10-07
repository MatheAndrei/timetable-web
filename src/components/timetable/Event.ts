import {DateTime} from "luxon";

export enum EventType {
	LECTURE = "lecture",
	SEMINAR = "seminar",
	LAB = "lab"
}

export interface Event {
	name: string;
	teacher: string;
	type: EventType;
	room: string;
	start: DateTime;
	end: DateTime;
	frequency: string;
}